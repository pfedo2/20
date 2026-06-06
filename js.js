const API_KEY = "56194186-3800f2f980ed4047c170df04b";
const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let searchText = "";

form.addEventListener("submit", searchImages);
loadMoreBtn.addEventListener("click", loadMoreImages);

async function getImages(query, pageNumber) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&page=${pageNumber}&per_page=12`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function searchImages(event) {
  try {
    event.preventDefault();

    searchText = form.elements.query.value.trim();

    if (searchText === "") {
      alert("Enter a word");
      return;
    }

    page = 1;
    gallery.innerHTML = "";

    const data = await getImages(searchText, page);

    createGallery(data.hits);

    loadMoreBtn.style.display = "block";
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreImages() {
  try {
    page++;

    const data = await getImages(searchText, page);

    createGallery(data.hits);

    loadMoreBtn.scrollIntoView({
      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
  }
}

function createGallery(images) {
  const markup = images
    .map((image) => {
      return `
      <li>
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}">

          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${image.likes}
            </p>

            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${image.views}
            </p>

            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${image.comments}
            </p>

            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${image.downloads}
            </p>
          </div>
        </div>
      </li>
      `;
    })
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
}
