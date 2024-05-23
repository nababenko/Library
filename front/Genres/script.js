document.addEventListener("DOMContentLoaded", function () {

    fetch('/genres/genre_lst')
        .then(response => response.json())
        .then(genres => {
            const listElement = document.getElementById('list');
            genres.forEach(genre => {
                const genreElement = document.createElement('div');
                genreElement.classList.add('content');
                genreElement.innerHTML = `<p class="genre">${genre}</p>`;
                listElement.appendChild(genreElement);
                genreElement.addEventListener('click', () => fetchBooksByGenre(genre));
            });
        })
        .catch(error => console.error('Error fetching:', error));


    function fetchBooksByGenre(genre) {
        fetch(`/genres/books_by_genre/${genre}`)
            .then(response => response.json())
            .then(books => {

                const bookListElement = document.getElementById('book-list');
                bookListElement.innerHTML = '';
                books.forEach(book => {
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book');
                    const anchorElement = document.createElement('a');
                    anchorElement.setAttribute('href', `/book_page/${book.ID}`);
                    anchorElement.textContent = ` ${book.name}`;
                    anchorElement.classList.add('book-link');
                    bookElement.appendChild(anchorElement);
                    bookListElement.appendChild(bookElement);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }
});

