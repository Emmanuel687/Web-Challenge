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

const ReadingList = ({ readingList, removeFromReadingList, handleToggle }) => {
	return (
		<>
			{/* Return to Booklist Button Start */}
			<div className="flex justify-between">
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={handleToggle}
					style={{
						fontFamily: "Mulish",
						color: "#4AA088",
						backgroundColor: "#ffff",
					}}
				>
					Return to Booklist
				</Button>
				<Typography sx={{ color: "#4AA088", fontFamily: "Mulish" }}>
					{readingList.length > 0 && `${readingList.length} Books`}
				</Typography>
			</div>
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
				<Typography
					variant="body1"
					align="center"
					sx={{ fontFamily: "Mulish" }}
					className="no-books-added"
				>
					No Books Added 😞
				</Typography>
			)}
			{/* Reading List End */}
		</>
	);
};

export default ReadingList;
