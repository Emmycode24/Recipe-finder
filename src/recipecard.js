import { useState } from "react";

export default function RecipeCard({ image, title, description, onFavorite, isFavorite, onView }) {
  const [bounce, setBounce] = useState(false);

  function handleFavoriteClick(e) {
    e.stopPropagation();
    setBounce(true);
    onFavorite();
    setTimeout(() => setBounce(false), 400);
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" onClick={onView}>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          {title}
          <button
            onClick={handleFavoriteClick}
            className={`ml-2 focus:outline-none transition-transform ${bounce ? 'animate-bounce' : ''}`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.54 0-2.878.792-3.562 2.008C12.566 4.542 11.228 3.75 9.688 3.75 7.099 3.75 5 5.765 5 8.25c0 7.22 7 11.25 7 11.25s7-4.03 7-11.25z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.54 0-2.878.792-3.562 2.008C12.566 4.542 11.228 3.75 9.688 3.75 7.099 3.75 5 5.765 5 8.25c0 7.22 7 11.25 7 11.25s7-4.03 7-11.25z" />
              </svg>
            )}
          </button>
        </h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onView(); }}
            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
