import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  // Prevent modal close when clicking inside the modal content
  function handleContentClick(e) {
    e.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh] relative"
        onClick={handleContentClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sky-500 hover:text-sky-200 text-lg"
        >
          ✕
        </button>

        {/* Recipe Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Recipe Title */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800">{recipe.strMeal}</h2>

        {/* Category & Area */}
        <p className="text-gray-600 mt-1">
          {recipe.strCategory} • {recipe.strArea}
        </p>

        {/* Instructions */}
        <h3 className="text-lg font-semibold mt-4">Instructions</h3>
        <p className="text-gray-700 mt-2 text-sm whitespace-pre-line">
          {recipe.strInstructions}
        </p>

        {/* Ingredients List */}
        <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
        <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((num) => ({
              ingredient: recipe[`strIngredient${num}`],
              measure: recipe[`strMeasure${num}`],
            }))
            .filter((item) => item.ingredient && item.ingredient.trim() !== "")
            .map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
