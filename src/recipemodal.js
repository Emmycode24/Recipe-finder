import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  // Prevent modal close when clicking inside the modal content
  function handleContentClick(e) {
    e.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 bg-sky bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-sky-300 rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh] relative transform transition-transform duration-300 scale-95 animate-modal-in"
        onClick={handleContentClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-500 hover:text-red-700 font-exdtrabold"
        >
          X
        </button>

        {/* Recipe Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-70 object-cover rounded-lg"
        />

        {/* Recipe Title */}
        <h2 className="text-2xl font-bold mt-4 ">{recipe.strMeal}</h2>

        {/* Category & Area */}
        <p className="text-zinc-900 mt-1">
          {recipe.strCategory} • {recipe.strArea}
        </p>

        {/* Instructions */}
        <h3 className="text-lg font-bold mt-4">Instructions:</h3>
        <p className=" mt-2 text-sm whitespace-pre-line">
          {recipe.strInstructions}
        </p>

        {/* Ingredients List */}
        <h3 className="text-lg font-bold mt-4">Ingredients:</h3>
        <ul className="list-disc pl-6 mt-2 text-sm ">
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
