
document.addEventListener("DOMContentLoaded", function () {

    function fetchAuthors() {
        fetch('/authors/authors-list')
            .then(response => response.json())
            .then(data => {
                const authors = data.authors;
                renderAuthors(authors);
                enableDisableButtons(authors);
            })
            .catch(error => console.error('Error fetching authors:', error));
    }


    function renderAuthors(authors) {
        const listDiv = document.getElementById('alist');
        listDiv.innerHTML = ''; // Clear the existing list

        authors.forEach(author => {
            const authorDiv = document.createElement('div');
            authorDiv.classList.add('author_div');

            const nameLink = document.createElement('a');
            nameLink.href = `/author_page/${author.id}`;
            nameLink.classList.add('name');
            nameLink.textContent = author.name;
            authorDiv.appendChild(nameLink);

            const bioP = document.createElement('p');
            bioP.classList.add('bio');
            bioP.textContent = author.description;
            authorDiv.appendChild(bioP);

            listDiv.appendChild(authorDiv);
        });
    }


    function filterAuthorsByLetter(letter) {
        fetch('/authors/authors-list')
            .then(response => response.json())
            .then(data => {
                const authors = data.authors.filter(author => author.name.toLowerCase().startsWith(letter.toLowerCase()));
                renderAuthors(authors);
                toggleActiveState(letter);
                enableDisableButtons(data.authors);
            })
            .catch(error => console.error('Error fetching authors:', error));
    }


    function toggleActiveState(letter) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach(l => {
            const btn = document.getElementById(`btn-${l}`);
            if (l === letter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }


    function enableDisableButtons(authors) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach(letter => {
            const authorsForLetter = authors.filter(author => author.name.toLowerCase().startsWith(letter.toLowerCase()));
            const button = document.getElementById(`btn-${letter}`);
            if (authorsForLetter.length === 0) {
                button.classList.add('disabled');
                button.disabled = true;
            } else {
                button.classList.remove('disabled');
                button.disabled = false;
            }
        });
    }


    fetchAuthors();


    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.id = `btn-${letter}`;
        letterButton.textContent = letter.toUpperCase();
        letterButton.addEventListener('click', () => {
            filterAuthorsByLetter(letter);
        });
        document.getElementById('filter-buttons').appendChild(letterButton);
    });
});