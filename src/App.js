import React, { useEffect, useState } from "react";

import RecipeCard from "./recipecard";
import RecipeModal from "./recipemodal";
import SearchBar from "./searchbar";


export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch recipes from API
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm || 'a'}`;
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [searchTerm]);



  // Load favorites from localStorage
 function toggleFavorite(recipe) {
    let updatedFavorites;
    if (favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      updatedFavorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }


// ...existing code...


 
  return (
    <div className="min-h-screen bg-emerald-200">
      {/* Header */}
      <header className="bg-sky-900 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">Interactive Recipe Finder</h1>
      </header>

      {/* Search */}
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* Recipe Grid or Loading Spinner */}
      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="flex justify-center items-center w-full h-64">
            <span className="relative flex h-16 w-16">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-16 w-16 bg-emerald-500"> </span>
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  image={recipe.strMealThumb}
                  title={recipe.strMeal}
                  description={recipe.strInstructions.slice(0, 80) + "..."}
                  isFavorite={favorites.some((fav) => fav.idMeal === recipe.idMeal)}
                  onFavorite={() => toggleFavorite(recipe)}
                  onView={() => setSelectedRecipe(recipe)}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No recipes found.</p>
            )}
          </div>
        )}
      </main>
    
     {/* Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}




