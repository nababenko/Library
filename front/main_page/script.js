fetch('/main/main_scroller')
    .then(response => response.json())
    .then(data => {
        const books = data.books;

        books.forEach((book, index) => {
            const imgElement = document.getElementById(`img-${index + 1}`);
            const nameElement = document.getElementById(`name-${index + 1}`);

            imgElement.src = book.cover;
            imgElement.parentElement.href = `/book_page/${book.id}`;
            nameElement.textContent = book.name;
            nameElement.href = `/book_page/${book.id}`;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

fetch('/main/last')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        document.getElementById('link-11').href = `/book_page/${data.ID}`; // Set the href attribute of the anchor element
        document.getElementById('img-11').src = data.Cover; // Set the src attribute of the image element
        document.getElementById('name-11').textContent = data.Name; // Set the text content of the name element
        document.getElementById('name-11').href = `/book_page/${data.ID}`;
        document.getElementById('author-11').textContent = data.Author; // Set the text content of the author element
        document.getElementById('author-11').href = `/author_page/${data.id}`;
        document.getElementById('desc_last').textContent = data.Description; // Set the text content of the description element
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
//scroller
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        });

        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
        }

        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }

        imageList.addEventListener("scroll", () => {
            updateScrollThumbPosition();
            handleSlideButtons();
        });
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);