const d = document;
const addMovieModal = d.getElementById("add-modal");
//const addMovieModal = d.querySelector("#add-modal");
//const addMovieModal = d.body.children[1];
const startAddMovieButton = d.querySelector("header button");
const backdrop = d.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = d.getElementById("entry-text");
const deleteMovieModal = d.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const cancelMovieDeletion = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
	let movieIndex = 0;
	for(const movie of movies) {
		if (movie.id === movieId) {
			console.log("inside if", movieIndex)
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	const listRoot = d.getElementById("movie-list");
	listRoot.children[movieIndex].remove();
	cancelMovieDeletion();
	updateUI();
};

const deleteMovieHandler = (movieId) => {
	const deleteMovieModal = d.getElementById("delete-modal");
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
	let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
	confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

	cancelDeletionButton.removeEventListener("click", cancelMovieDeletion);
	cancelDeletionButton.addEventListener("click", cancelMovieDeletion)
	confirmDeletionButton.addEventListener("click", deleteMovie.bind(null, movieId));
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = d.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
		<div class="movie-element__image">
			<img src="${imageUrl}" alt="${title}">
		</div>
		<div class="movie-element__info">
			<h2>${title}</h2>
			<p>${rating}/5 stars</p>
		</div>
	`;

	newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
	const listRoot = d.getElementById("movie-list");
	listRoot.append(newMovieElement);
}

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
	addMovieModal.classList.remove("visible");
}

const showMovieModal = () => {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
}

const clearMovieInput = () => {
	for (const userInput of userInputs) {
		userInput.value = "";
	}
}

const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
}

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2	].value;

	if (titleValue.trim() === "" || imageUrlValue === "" || ratingValue === "" || parseInt(ratingValue) < 1 || parseInt(ratingValue) > 5) {
		alert("Please enter valid values (rating between 1 and 5)");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};

	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
}

const backdropClickHandler = () => {
	closeMovieModal();
	cancelMovieDeletion();
	clearMovieInput();
}

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler)