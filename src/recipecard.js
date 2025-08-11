export default function RecipeCard({ image, title, description, onFavorite, isFavorite, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onFavorite}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isFavorite ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
            }`}
          >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
          </button>
          <button
            onClick={onView}
            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
