/* Drop list*/
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//search
function searchBooks() {
    var searchTerm = document.querySelector('.search').value.trim();

    var searchResultsDiv = document.getElementById('searchResults');

    if (searchTerm.length > 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/search', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                displaySearchResults(response);
            }
        };
        xhr.send(JSON.stringify({ searchTerm: searchTerm }));

        searchResultsDiv.style.display = 'block';
    } else {
        searchResultsDiv.innerHTML = '';
        searchResultsDiv.style.display = 'none';
    }
}

function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(function (result) {
            var p = document.createElement('p');
            var bookLink = document.createElement('a');
            bookLink.textContent = result.book_name + ' by ' + result.author_name;
            bookLink.href = `/book_page/${result.ID}`;
            p.appendChild(bookLink);
            searchResultsDiv.appendChild(p);
        });
    } else {
        var p = document.createElement('p');
        p.textContent = 'No results found';
        searchResultsDiv.appendChild(p);
    }
}