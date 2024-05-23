async function fetchData() {
    try {
        const id = window.location.pathname.split('/').pop();

        const response = await fetch(`/author_page/data/${id}`);
        const data = await response.json();

        document.getElementById('author').textContent = data.Author;
        document.getElementById('datebrth').textContent = data.ADate;
        document.getElementById('country').textContent = data.Country;
        document.getElementById('author_image').src = data.Image;
        document.getElementById('bio').textContent = data.Bio;

        const booksContainer = document.getElementById('books');

        if (data.Books && data.Books.length > 0) {
            data.Books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');
                bookElement.innerHTML = `
                    <div class="book-info">
                        <a href="/book_page/${book.ID}" class="name">${book.Name}</a>
                        <p class="date">${book.Year}</p>
                    </div>
                    <hr/>
                `;
                booksContainer.appendChild(bookElement);
            });
        } else {
            const noBooksMessage = document.createElement('p');
            noBooksMessage.textContent = 'No books found.';
            booksContainer.appendChild(noBooksMessage);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;