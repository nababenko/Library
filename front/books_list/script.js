document.addEventListener("DOMContentLoaded", function () {
    fetch('/books_list/books')
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            const listDiv = document.getElementById('list');

            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');

                const coverImg = document.createElement('img');
                coverImg.src = book.cover;
                coverImg.alt = book.name;
                coverImg.classList.add('cover');
                bookDiv.appendChild(coverImg);

                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');

                const nameLink = document.createElement('a');
                nameLink.href = `/book_page/${book.id}`;
                nameLink.classList.add('name');
                nameLink.textContent = book.name;
                detailsDiv.appendChild(nameLink);

                const dateP = document.createElement('p');
                dateP.classList.add('date');
                dateP.textContent = book.date;
                detailsDiv.appendChild(dateP);

                const descriptionP = document.createElement('p');
                descriptionP.classList.add('description');
                descriptionP.textContent = book.description;
                detailsDiv.appendChild(descriptionP);

                bookDiv.appendChild(detailsDiv);
                listDiv.appendChild(bookDiv);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});