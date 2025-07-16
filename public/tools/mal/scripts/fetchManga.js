const sidebar = document.getElementById("sidebar");
const title = document.getElementById("title");
const img = document.getElementById("poster");
const synopsis = document.getElementById("synopsis");
const altTitles = document.getElementById("alt-titles");
const type = document.getElementById("media-type");
const chapters = document.getElementById("chapters");
const volumes = document.getElementById("volumes");
const currentStatus = document.getElementById("status");
const score = document.getElementById("score");
const rank = document.getElementById("rank");
const themes = document.getElementById("themes");
const genres = document.getElementById("genres");
const published = document.getElementById("published");
let lastPageNumber = 1;

// Manga data structure
let mangaData = {
  mal_id: 0,
  url: "string",
  images: {},
  approved: true,
  titles: [],
  title: "string",
  title_english: "string",
  title_japanese: "string",
  type: "Manga",
  chapters: 0,
  volumes: 0,
  status: "",
  publishing: true,
  published: {},
  score: 0,
  scored_by: 0,
  rank: 0,
  popularity: 0,
  members: 0,
  favorites: 0,
  synopsis: "string",
  background: "string",
  authors: [],
  serializations: [],
  genres: [],
  explicit_genres: [],
  themes: [],
  demographics: []
};


// Construct the API URL based on filters
function generateURL() {
  clearDisplay();
  title.innerHTML = `<h2>Loading...</h2>`;
  const url = `https://api.jikan.moe/v4/manga`;
  let filters = [];
  let typeFilter = document.getElementById("type-filter").value;
  let ratingFilter = document.getElementById("rating-filter").value;
  let genreFilter = document.getElementById("genre-filter").value;
  let minRange = document.getElementById("min-range").value;
  let maxRange = document.getElementById("max-range").value;

  if (typeFilter) filters.push(`type=${typeFilter}`);
  if (ratingFilter)
    filters.push(ratingFilter === "sfw" ? "sfw" : `rating=${ratingFilter}`);
  if (genreFilter) filters.push(`genres=${genreFilter}`);
  if (minRange) filters.push(`min_score=${minRange}`);
  if (maxRange) filters.push(`max_score=${maxRange}`);

  let filteredURL = `${url}?${filters.join("&")}`;

  validateFetchData(filteredURL);
}

// Validate and fetch data from the constructed URL
function validateFetchData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((responseData) => {
      if (responseData.pagination.items.count === 0) {
        displayNoResult();
      } else {
        lastPageNumber = responseData.pagination.last_visible_page;
        getData(url);
      }
    })
    .catch(() => {
      console.warn("Fetching data failed.");
    });
}

// Fetch random manga data from the API
function getData(url) {
  let random;
  if (lastPageNumber === 1) {
    random = 1;
  } else {
    random = Math.floor(Math.random() * lastPageNumber + 1);
  }
  let fetchURL = `${url}&page=${random}`;

  fetch(fetchURL)
    .then((resp) => resp.json())
    .then((responseData) => {
      let length = responseData.data.length - 1;
      let index = Math.floor(Math.random() * length);
      mangaData = { ...mangaData, ...responseData.data[index] };

      updateHTML();
    })
    .catch((e) => {
      console.warn(e);
    });
}

// Update the HTML
function updateHTML() {
  clearDisplay();
  console.log(mangaData.themes)

  title.innerHTML = `<a href="${mangaData.url}"><h2>${mangaData.title}</h2></a>`;
  img.innerHTML = `<img src="${mangaData.images.jpg.image_url}" />`;
  synopsis.innerText = mangaData.synopsis;

  if (mangaData.titles.length > 0) {
    let titlesList = document.createElement("ul");
    mangaData.titles.forEach((item, index) => {
      if (index > 0) {
        // Skip the main title
        let listItem = document.createElement("li");
        listItem.textContent = `${item.type}: ${item.title}`;
        titlesList.appendChild(listItem);
      }
    });
    altTitles.appendChild(titlesList);
  } else {
    altTitles.innerHTML = `<ul><li>None found</li></ul>`;
  }

  type.innerText = mangaData.type || "Unknown";
  chapters.innerText = mangaData.chapters || "Unknown";
  volumes.innerText = mangaData.volumes || "Unknown";
  currentStatus.innerText = mangaData.status || "Unknown";
  published.innerText = mangaData.published.string || "Unknown";
  score.innerText = mangaData.score || "Unknown";
  rank.innerText = mangaData.rank || "Unknown";
  themes.innerText =
    mangaData.themes.length > 0
      ? mangaData.themes.map((item) => item.name).join(", ")
      : "Unknown";
  genres.innerText =
    mangaData.genres.length > 0
      ? mangaData.genres.map((item) => item.name).join(", ")
      : "Unknown";
}

// Display no result found
function displayNoResult() {
  clearDisplay();
  console.log("No results found.");
}

// Clear the display
function clearDisplay() {
  title.innerHTML = "";
  img.innerHTML = "";
  synopsis.innerHTML = "";
  altTitles.innerHTML = "";
  type.innerHTML = "";
  chapters.innerHTML = "";
  volumes.innerHTML = "";
  currentStatus.innerHTML = "";
  score.innerHTML = "";
  rank.innerHTML = "";
  themes.innerHTML = "";
  genres.innerHTML = "";
  published.innerHTML = "";
}

// Event listener
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetchButton")
    .addEventListener("click", generateURL);
});
