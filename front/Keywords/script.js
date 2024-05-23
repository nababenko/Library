document.addEventListener("DOMContentLoaded", function () {

    fetch('/keywords/keyword_lst')
        .then(response => response.json())
        .then(keyword => {
            const listElement = document.getElementById('list');
            keyword.forEach(keyword => {
                const keywordElement = document.createElement('div');
                keywordElement.classList.add('content');
                keywordElement.innerHTML = `<p class="genre">${keyword}</p>`;
                listElement.appendChild(keywordElement);
                keywordElement.addEventListener('click', () => fetchBooksByGenre(keyword));
            });
        })
        .catch(error => console.error('Error fetching:', error));


    function fetchBooksByGenre(keyword) {
        fetch(`/keywords/books_by_keyword/${keyword}`)
            .then(response => response.json())
            .then(books => {

                const bookListElement = document.getElementById('book-list');
                bookListElement.innerHTML = ''; // Clear previous book list
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
