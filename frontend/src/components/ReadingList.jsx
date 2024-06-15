import React from "react";
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	IconButton,
	Button,
	Box,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadingList = ({ readingList, removeFromReadingList, handleToggle }) => {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{/* Return to Booklist Button Start */}
			<Box display="flex" alignItems="center" mb={2}>
				<Button startIcon={<ArrowBackIcon />} onClick={handleToggle}>
					Return to Booklist
				</Button>
			</Box>
			{/* Return to Booklist Button End */}

			{/* Reading List Start */}
			{readingList.length ? (
				<List>
					{readingList.map((book) => (
						<ListItem
							key={`${book.title}-${book.author}`}
							sx={{
								backgroundColor: "#f5f5f5",
								borderRadius: "10px",
								marginBottom: "10px",
							}}
						>
							{/* Book Avatar Start*/}
							<ListItemAvatar>
								<Avatar alt={book.title} src={book.coverPhotoURL} />
							</ListItemAvatar>
							{/* Book Avatar End*/}

							{/* Book Title and Author Start */}
							<ListItemText
								primary={book.title}
								secondary={book.author}
								sx={{ fontFamily: "Mulish", fontWeight: "bold" }}
							/>
							{/* Book Title and Author End */}

							{/* Delete Book Icon Start */}
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() =>
									removeFromReadingList(`${book.title}-${book.author}`)
								}
							>
								<DeleteIcon />
							</IconButton>
							{/* Delete Book Icon End */}
						</ListItem>
					))}
				</List>
			) : (
				<Typography variant="body1" align="center" className="no-books-added">
					No Books Added
				</Typography>
			)}

			{/* Reading List End */}
		</>
	);
};

export default ReadingList;
