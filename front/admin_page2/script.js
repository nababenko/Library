document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('author-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/admin2/author', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                location.reload();
            } else {
                if (result.error) {
                    alert(result.error);
                } else {
                    alert('An unexpected error occurred');
                }
            }
        } catch (error) {
            alert('An unexpected error occurred');
            console.error(error);
        }
    });
});

function editRow(id) {

    fetch(`/admin2/data/${id}`)
        .then(response => response.json())
        .then(rowData => {

            const form = document.createElement('form');
            form.innerHTML = `
        
        <input type="text" id="author_name" name="author_name"  value="${rowData.author_name}">
        <input type="text" id="author_date" name="author_date"  value="${rowData.author_date}">
        <input type="text" id="author_country" name="author_country"  value="${rowData.author_country}">
        <input type="text" id="author_bio" name="author_bio"  value="${rowData.author_bio}">
        <input type="text" id="rowData.author_image" name="author_image"  value="${rowData.author_image}">
        
        <button type="submit">Save</button>
      `;


            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.appendChild(form);
            document.body.appendChild(modal);


            form.addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedData = Object.fromEntries(formData.entries());


                fetch(`/admin2/edit/${id}`, {
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

function deleteRow(id) {

    const confirmation = confirm('Are you sure you want to delete this row?');
    if (!confirmation) {
        return;
    }


    fetch(`/admin2/delete/${id}`, {
        method: 'POST'
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            const deletedRow = document.getElementById(`row-${id}`);
            if (deletedRow) {
                deletedRow.remove();
            }
            alert("Data deleted successfully. Refresh page to update table.");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

fetch('/admin2/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('data');
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${row.author_id}</td>
            <td>${row.author_name}</td>
            <td>${row.author_date}</td>
            <td>${row.author_country}</td>
            <td>${row.author_bio}</td>
            <td>${row.author_image}</td>
            
            <td>
              <button onclick="editRow(${row.author_id})">Edit</button>
              <button onclick="deleteRow(${row.author_id})">Delete</button>
            </td>
          `;
            tableBody.appendChild(tr);
        });
    });

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