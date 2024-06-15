import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { GridLoader } from "react-spinners";
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

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
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
			<div className="bg-[#4AA088]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex-shrink-0">
							<Typography
								variant="body1"
								sx={{
									color: "#ffff",
									fontSize: "large",
									fontWeight: "bold",
									fontFamily: '"Mulish"',
								}}
							>
								ello 📚
							</Typography>
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
										<TextField {...params} label="Search Book" size="small" />
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Loader Start */}
			{loading && (
				<div
					className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white z-50"
					style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
				>
					<GridLoader
						css={override}
						loading={loading}
						size={15}
						color="#335C6E"
					/>
				</div>
			)}
			{/* Loader End */}

			{/* Error Handling Start */}
			{error && (
				<p className="text-red-600 text-center mt-4">Error: {error.message}</p>
			)}
			{/* Error Handling End */}
		</>
	);
}
