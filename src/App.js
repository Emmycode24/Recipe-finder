import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


import RecipeCard from "./recipecard";
import RecipeModal from "./recipemodal";
import SearchBar from "./searchbar";
import Toast from "./toast";


export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

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

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);



  // Load favorites from localStorage
  function toggleFavorite(recipe, animate = false) {
    if (favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      if (animate) {
        setRemovingId(recipe.idMeal);
        setTimeout(() => {
          setFavorites((prev) => prev.filter((fav) => fav.idMeal !== recipe.idMeal));
          setToast({ message: "Recipe removed from favorites!", type: "error" });
          setRemovingId(null);
        }, 200); // match fade-out duration
      } else {
        setFavorites((prev) => prev.filter((fav) => fav.idMeal !== recipe.idMeal));
        setToast({ message: "Recipe removed from favorites!", type: "error" });
      }
    } else {
      setFavorites((prev) => [...prev, recipe]);
      setToast({ message: "Recipe added to favorites!", type: "success" });
    }
  }


// ...existing code...


 
  return (
    <div className="min-h-screen bg-emerald-200">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Navigation */}
      <header className="bg-sky-900 py-6 shadow-md flex flex-col sm:flex-row items-center justify-between px-6">
        <h1 className="text-white text-3xl font-bold mb-2 sm:mb-0 cursor-pointer" onClick={() => navigate("/")}>Interactive Recipe Finder</h1>
        <nav>
          <Link to="/" className="text-white px-4 py-2 rounded hover:bg-emerald-800 transition">Home</Link>
          <Link to="/favorites" className="text-white px-4 py-2 rounded hover:bg-emerald-800 transition">Favorites</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
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
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <main className="max-w-7xl mx-auto px-6 py-10 min-h-[300px]">
              <h2 className="text-2xl font-bold text-center mb-8 text-emerald-700">Your Favorite Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {favorites.length > 0 ? (
                  favorites.map((recipe) => (
                    <div
                      key={recipe.idMeal}
                      className={removingId === recipe.idMeal ? "animate-fade-out" : ""}
                    >
                      <RecipeCard
                        image={recipe.strMealThumb}
                        title={recipe.strMeal}
                        description={recipe.strInstructions.slice(0, 80) + "..."}
                        isFavorite={true}
                        onFavorite={() => toggleFavorite(recipe, true)}
                        onView={() => setSelectedRecipe(recipe)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center">No favorites yet.</p>
                )}
              </div>
              {/* Modal */}
              {selectedRecipe && (
                <RecipeModal
                  recipe={selectedRecipe}
                  onClose={() => setSelectedRecipe(null)}
                />
              )}
            </main>
          }
        />
      </Routes>
    </div>
  );
}




