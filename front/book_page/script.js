

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

async function fetchData() {
    try {

        const id = window.location.pathname.split('/').pop();
        const response = await fetch(`http://localhost:3000/book_page/data/${id}`);
        const data = await response.json();


        document.getElementById('date').textContent = data.Date;
        document.getElementById('name').textContent = data.Name;
        document.getElementById('genre').textContent = data.Genre;
        document.getElementById('description').textContent = data.Description;
        document.getElementById('paragraph').textContent = data.Paragraph;
        document.getElementById('cover').src = data.Cover;

        const aPageLink = document.createElement('a');
        aPageLink.href = `/author_page/${data.id}`;
        aPageLink.textContent = data.Author;
        document.getElementById('author').appendChild(aPageLink);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;