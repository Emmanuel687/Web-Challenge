import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../App.scss";

const GET_BOOKS = gql`
	query GetBooks {
		books {
			author
			coverPhotoURL
			readingLevel
			title
		}
	}
`;

export default function SearchBar({ onSelectBook, onSearch }) {
	const { loading, error, data } = useQuery(GET_BOOKS);
	const [inputValue, setInputValue] = useState("");
	const [allBooks, setAllBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);

	useEffect(() => {
		if (data) {
			setAllBooks(data.books);
			setFilteredBooks(data.books);
		}
	}, [data]);

	if (loading) return <p className="align-center">Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const handleInputChange = (event, value) => {
		setInputValue(value);
		if (value === "") {
			setFilteredBooks(allBooks);
			onSearch(allBooks);
		} else {
			const filtered = allBooks.filter((book) =>
				book.title.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredBooks(filtered);
			onSearch(filtered);
		}
	};

	const handleSelectBook = (event, newValue) => {
		if (newValue) {
			setInputValue(newValue.title);
			onSelectBook(newValue);
		} else {
			setInputValue("");
			onSelectBook(null);
		}
	};

	return (
		<>
			<div className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex-shrink-0">
							<p className="text-[#5ACCCC] text-lg font-bold">ello 📚</p>
						</div>
						<div className="md:block w-1/2">
							<div className="flex items-center">
								<Autocomplete
									disablePortal
									id="combo-box-demo"
									options={filteredBooks}
									getOptionLabel={(option) =>
										typeof option === "string" ? option : option.title
									}
									onChange={handleSelectBook}
									onInputChange={handleInputChange}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Book"
											variant="outlined"
											size="small"
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
