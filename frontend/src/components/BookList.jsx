import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";

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

const BookList = ({ selectedBook, addToReadingList, handleToggle }) => {
	const { loading, error, data } = useQuery(GET_BOOKS);
	const [addedBooks, setAddedBooks] = useState([]);

	const handleAddToReadingList = (book) => {
		if (!addedBooks.includes(book.title)) {
			addToReadingList(book);
			setAddedBooks([...addedBooks, book.title]);
			toast.success(`${book.title} added to your reading list!`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error("This book is already in your reading list!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const booksToShow = selectedBook ? [selectedBook] : data?.books || [];

	return (
		<Grid container spacing={2}>
			{booksToShow.map((book) => (
				<Grid item key={book.title} xs={12} sm={6} md={4} lg={4}>
					<Card>
						{/* Book Card Image Start */}
						<CardMedia
							component="img"
							height="50"
							image={book.coverPhotoURL} // Pass the coverPhotoURL here
							alt={book.title}
						/>
						{/* Book Card Image End */}

						{/* Book Details Start */}
						<CardContent>
							<Typography
								variant="h5"
								sx={{ color: "#335C6E", fontWeight: "bold", fontSize: 16 }}
							>
								{book.title}
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{ color: "#4AA088", fontWeight: "normal", fontSize: 12 }}
							>
								{book.author}
							</Typography>
						</CardContent>
						{/* Book Details End */}

						{/* Book BTN Add && View Student Books Start */}
						<div className="mt-[10px]">
							<button
								className="ml-4 bg-[#27b8b8] hover:bg-[#53C2C2] pt-[5px] pb-[5px] pl-[16px] pr-[16px] text-[#ffff] font-[500] rounded-[10px]"
								onClick={() => handleAddToReadingList(book)}
							>
								Add 📖
							</button>
							<button
								className="ml-4 bg-[#27b8b8] hover:bg-[#53C2C2] pt-[5px] pb-[5px] pl-[16px] pr-[16px] text-[#ffff] font-[500] rounded-[10px]"
								onClick={() => handleToggle()}
							>
								View Student List 👨‍🎓
							</button>
						</div>
						{/* Book BTN Add && View Student Books End */}
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default BookList;
