// Cache DOM elements to avoid redundant lookups
const sidebar = document.getElementById("sidebar");
const title = document.getElementById("title");
const img = document.getElementById("poster");
const synopsis = document.getElementById("synopsis");
const altTitles = document.getElementById("alt-titles");
const mediaTypes = document.getElementById("media-type");
const rating = document.getElementById("rating");
const themes = document.getElementById("themes");
const airing = document.getElementById("airing");
const score = document.getElementById("score");
const rank = document.getElementById("rank");
const genres = document.getElementById("genres");
const duration = document.getElementById("duration");
const trailer = document.getElementById("trailer");
let lastPageNumber = 1;

// Default anime data structure
let animeData = {
  mal_id: 0,
  url: "https://myanimelist.net/anime/",
  images: {},
  trailer: {},
  approved: false,
  titles: [],
  title: "",
  title_english: "",
  title_japanese: "",
  title_synonyms: [],
  aired: {
    from: "2000-01-01T00:00:00+00:00",
    to: "2000-12-31T00:00:00+00:00",
    string: "",
  },
  airing: false,
  background: null,
  broadcast: {
    day: null,
    time: null,
    string: "",
  },
  demographics: [],
  duration: "",
  episodes: 0,
  explicit_genres: [],
  favorites: 0,
  genres: [],
  images: { jpg: {}, webp: {} },
  licensors: [],
  mal_id: 0,
  members: 0,
  popularity: 0,
  producers: [],
  rank: 0,
  rating: "",
  score: 0.1,
  scored_by: 0,
  season: "",
  source: "",
  status: "",
  studios: [],
  synopsis: "",
  themes: [],
  type: "",
  url: "",
  year: 2000,
};

// Function to construct the API URL based on selected filters
function generateURL() {
  const url = `https://api.jikan.moe/v4/anime`;
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
  console.log(filteredURL);

  validateFetchData(filteredURL);
}

// Function to validate and fetch data from the constructed URL
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

// Function to fetch random anime data from the API
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
      animeData = { ...animeData, ...responseData.data[index] };

      updateHTML();
    })
    .catch((e) => {
      console.warn(e);
    });
}

// Function to update the HTML with fetched anime data
function updateHTML() {
  clearDisplay();

  title.innerHTML = `<a href="${animeData.url}"><h2>${animeData.title}</h2></a>`;
  img.innerHTML = `<img src="${animeData.images.jpg.image_url}" />`;
  synopsis.innerText = animeData.synopsis;

  if (animeData.titles.length > 0) {
    let titlesList = document.createElement("ul");
    animeData.titles.forEach((item, index) => {
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

  mediaTypes.innerText = animeData.type || "None";
  rating.innerText = animeData.rating || "None";
  airing.innerText = animeData.aired.string || "None";
  score.innerText = animeData.score || "None";
  rank.innerText = animeData.rank || "None";
  duration.innerText = animeData.duration || "None";

  themes.innerText =
    animeData.themes.length > 0
      ? animeData.themes.map((item) => item.name).join(", ")
      : "None";
  genres.innerText =
    animeData.genres.length > 0
      ? animeData.genres.map((item) => item.name).join(", ")
      : "None";

  if (animeData.trailer.embed_url) {
    trailer.innerHTML = `
      <h3>Trailer</h3>
      <hr />
      <iframe width="420" height="315" title="YouTube video player" src="${animeData.trailer.embed_url}?autoplay=0" allowfullscreen></iframe>
    `;
  } else {
    trailer.innerHTML = null;
  }
}

// Function to display no result found
function displayNoResult() {
  clearDisplay();
  console.log("No results found.");
}

// Function to clear the display
function clearDisplay() {
  title.innerHTML = "";
  img.innerHTML = "";
  synopsis.innerHTML = "";
  altTitles.innerHTML = "";
  mediaTypes.innerHTML = "";
  rating.innerHTML = "";
  themes.innerHTML = "";
  airing.innerHTML = "";
  score.innerHTML = "";
  rank.innerHTML = "";
  genres.innerHTML = "";
  duration.innerHTML = "";
  trailer.innerHTML = "";
}

// Event listener to generate genre list and set up fetch button event
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetchButton")
    .addEventListener("click", generateURL);
});
