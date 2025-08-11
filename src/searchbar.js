
 

import { useState, useEffect } from "react";

export default function SearchBar({ searchTerm, onSearch }) {
	const [input, setInput] = useState(searchTerm);

	useEffect(() => {
		setInput(searchTerm);
	}, [searchTerm]);


		function handleSubmit(e) {
			e.preventDefault();
			onSearch(input);
		}

		// Auto-reset when input is cleared
		useEffect(() => {
			if (input === "") {
				onSearch("");
			}
		}, [input, onSearch]);

	return (
		<form className="flex justify-center mt-6 relative" onSubmit={handleSubmit}>
			
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Search recipes..."
						className="pl-10 border border-sky-500 rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
						autoComplete="off"
					/>
			<button
				type="submit"
				className="ml-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-semibold shadow"
			>
				Search
			</button>
		</form>
	);
}


