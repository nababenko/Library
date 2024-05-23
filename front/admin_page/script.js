//add new book
document.addEventListener('DOMContentLoaded', function() {
    // Fetch authors and populate the select element
    fetch('/admin/api/authors')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('author');
            data.forEach(author => {
                const option = document.createElement('option');
                option.value = author.author_id;
                option.textContent = author.author_id;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching authors:', error));


    const form = document.getElementById('book');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/admin/book', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                location.reload();
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('An unexpected error occurred');
            console.error(error);
        }
    });
});

//edit row in a table
function editRow(id) {
    fetch(`/admin/data/${id}`)
        .then(response => response.json())
        .then(rowData => {

            const form = document.createElement('form');
            form.innerHTML = `
                <input type="text" id="name" name="name" value="${rowData.name}">
                <select id="author" name="author"></select>
                <input type="text" id="date" name="date" maxlength="4" size="4" value="${rowData.date}">
                <input type="text" id="keyword" name="keyword"  value="${rowData.keyword}">
                <input type="text" id="genre" name="genre"  value="${rowData.genre}">
                <input type="text" id="description" name="description"  value="${rowData.description}">
                <input type="text" id="paragraph" name="paragraph"  value="${rowData.paragraph}">
                <input type="text" id="cover" name="cover"  value="${rowData.cover}">
                <button type="submit">Save</button>
            `;

            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.appendChild(form);
            document.body.appendChild(modal);

            const authorSelect = form.querySelector('#author');


            fetch('/admin/api/authors')
                .then(response => response.json())
                .then(authors => {
                    authors.forEach(author => {
                        const option = document.createElement('option');
                        option.value = author.author_id;
                        option.textContent = author.author_id;
                        authorSelect.appendChild(option);
                    });

                    authorSelect.value = rowData.author;
                })
                .catch(error => {
                    console.error('Error fetching authors:', error);
                });

            form.addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedData = Object.fromEntries(formData.entries());


                fetch(`/admin/edit/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                    .then(response => response.text())
                    .then(message => {
                        console.log(message);
                        modal.remove();
                        alert("Data updated successfully.");
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//delete row from table
function deleteRow(id) {

    const confirmation = confirm('Are you sure you want to delete this row?');
    if (!confirmation) {
        return;
    }


    fetch(`/admin/delete/${id}`, {
        method: 'POST'
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            const deletedRow = document.getElementById(`row-${id}`);
            if (deletedRow) {
                deletedRow.remove();
            }
            alert("Data deleted successfully.");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//output table
fetch('/admin/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('data');
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${row.ID}</td>
            <td>${row.name}</td>
            <td>${row.author}</td>
            <td>${row.date}</td>
            <td>${row.keyword}</td>
            <td>${row.genre}</td>
            <td>${row.description}</td>
            <td>${row.paragraph}</td>
            <td>${row.cover}</td>
            
            <td>
              <button onclick="editRow(${row.ID})">Edit</button>
              <button onclick="deleteRow(${row.ID})">Delete</button>
            </td>
          `;
            tableBody.appendChild(tr);
        });
    });

//check if file is loaded
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('photoInput');
    const customFileUpload = document.querySelector('.custom-file-upload');

    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            customFileUpload.classList.add('uploaded');
        } else {
            customFileUpload.classList.remove('uploaded');
        }
    });
});

