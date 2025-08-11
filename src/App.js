import React, { useEffect, useState } from "react";
import RecipeCard from "./recipecard";
import RecipeModal from "./recipemodal";


export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes from API
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
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


function SearchBar({ searchTerm, onSearch }) {
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <form className="flex justify-center mt-6" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search recipes..."
        className="border border-sky-500 rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
      >
        Search
      </button>
    </form>
  );
}


 
  return (
    <div className="min-h-screen bg-emerald-200">
      {/* Header */}
      <header className="bg-sky-900 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">Interactive Recipe Finder</h1>
      </header>

     {/* Search */}
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* Recipe Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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




