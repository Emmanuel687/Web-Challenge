import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import Container from "@mui/material/Container";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import Footer from "./components/Footer";
import Header from "./components/Header";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
});

function App() {
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [readingList, setReadingList] = useState([]);
	const [showCard, setShowCard] = useState(true);

	const addToReadingList = (book) => {
		setReadingList([...readingList, book]);
	};

	const removeFromReadingList = (identifier) => {
		const removedBook = readingList.find(
			(book) => `${book.title}-${book.author}` === identifier
		);
		if (removedBook) {
			setReadingList(
				readingList.filter(
					(book) => `${book.title}-${book.author}` !== identifier
				)
			);
			toast.error(`${removedBook.title} removed from your reading list!`, {
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

	const handleToggle = () => {
		setShowCard(!showCard);
	};

	return (
		<>
			<ToastContainer />
			<ApolloProvider client={client}>
				{/* <Header /> */}
				<SearchBar onSelectBook={setSelectedBook} onSearch={setFilteredBooks} />
				<Container>
					<div>
						<div className="mt-10">
							{showCard ? (
								<div className="mt-25">
									<BookList
										selectedBook={selectedBook}
										addToReadingList={addToReadingList}
										handleToggle={handleToggle}
									/>
								</div>
							) : (
								<ReadingList
									readingList={readingList}
									removeFromReadingList={removeFromReadingList}
									handleToggle={handleToggle}
								/>
							)}
						</div>
					</div>
					<Footer />
				</Container>
			</ApolloProvider>
		</>
	);
}

export default App;
