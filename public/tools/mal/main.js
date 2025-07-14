document.addEventListener("DOMContentLoaded", function () {
  generateGenreList();

  document
    .getElementById("fetchAnimeButton")
    .addEventListener("click", function () {
      generateURL();
    });
});

function generateGenreList() {
  let selectElement = document.getElementById("genre-filter");

  genreList.forEach(function (genre) {
    let optionElement = document.createElement("option");
    optionElement.value = genre.value;
    optionElement.text = genre.label;
    selectElement.add(optionElement);
  });
}

let genreList = [
  { value: "", label: "Any Genre" },
  { value: "1", label: "Action" },
  { value: "50", label: "Adult Cast" },
  { value: "2", label: "Adventure" },
  { value: "51", label: "Anthropomorphic" },
  { value: "5", label: "Avant Garde" },
  { value: "46", label: "Award Winning" },
  { value: "28", label: "Boys Love" },
  { value: "52", label: "CGDCT" },
  { value: "53", label: "Childcare" },
  { value: "54", label: "Combat Sports" },
  { value: "4", label: "Comedy" },
  { value: "81", label: "Crossdressing" },
  { value: "55", label: "Delinquents" },
  { value: "39", label: "Detective" },
  { value: "8", label: "Drama" },
  { value: "9", label: "Ecchi" },
  { value: "56", label: "Educational" },
  { value: "49", label: "Erotica" },
  { value: "10", label: "Fantasy" },
  { value: "57", label: "Gag Humor" },
  { value: "26", label: "Girls Love" },
  { value: "58", label: "Gore" },
  { value: "47", label: "Gourmet" },
  { value: "35", label: "Harem" },
  { value: "12", label: "Hentai" },
  { value: "59", label: "High Stakes Game" },
  { value: "13", label: "Historical" },
  { value: "14", label: "Horror" },
  { value: "60", label: "Idols (Female)" },
  { value: "61", label: "Idols (Male)" },
  { value: "62", label: "Isekai" },
  { value: "63", label: "Iyashikei (healing)" },
  { value: "43", label: "Josei" },
  { value: "15", label: "Kids" },
  { value: "64", label: "Love Polygon" },
  { value: "65", label: "Magical Sex Shift" },
  { value: "66", label: "Mahou Shoujo" },
  { value: "17", label: "Martial Arts" },
  { value: "18", label: "Mecha" },
  { value: "67", label: "Medical" },
  { value: "38", label: "Military" },
  { value: "19", label: "Music" },
  { value: "7", label: "Mystery" },
  { value: "6", label: "Mythology" },
  { value: "68", label: "Organized Crime" },
  { value: "69", label: "Otaku Culture" },
  { value: "20", label: "Parody" },
  { value: "70", label: "Performing Arts" },
  { value: "71", label: "Pets" },
  { value: "40", label: "Psychological" },
  { value: "3", label: "Racing" },
  { value: "72", label: "Reincarnation" },
  { value: "73", label: "Reverse Harem" },
  { value: "22", label: "Romance" },
  { value: "74", label: "Romantic Subtext" },
  { value: "21", label: "Samurai" },
  { value: "23", label: "School" },
  { value: "24", label: "Sci-Fi" },
  { value: "42", label: "Seinen" },
  { value: "25", label: "Shoujo" },
  { value: "27", label: "Shounen" },
  { value: "75", label: "Showbiz" },
  { value: "36", label: "Slice of Life" },
  { value: "29", label: "Space" },
  { value: "30", label: "Sports" },
  { value: "11", label: "Strategy Game" },
  { value: "31", label: "Super Power" },
  { value: "37", label: "Supernatural" },
  { value: "76", label: "Survival" },
  { value: "41", label: "Suspense" },
  { value: "77", label: "Team Sports" },
  { value: "78", label: "Time Travel" },
  { value: "32", label: "Vampire" },
  { value: "79", label: "Video Game" },
  { value: "80", label: "Visual Arts" },
  { value: "48", label: "Workplace" },
];

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
  approved: false,
  background: null,
  broadcast: {
    day: null,
    time: null,
    string: "",
  },
  demographics: [],
  duration: "",
  episodes: 31,
  explicit_genres: [],
  favorites: 8,
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

function generateURL() {
  const url = `https://api.jikan.moe/v4/anime`;
  let filters = `?`;
  let typeFilter = document.getElementById("type-filter").value;
  let ratingFilter = document.getElementById("rating-filter").value;
  let genreFilter = document.getElementById("genre-filter").value;
  let minRange = document.getElementById("min-range").value;
  let maxRange = document.getElementById("max-range").value;

  filters += typeFilter ? `&type=${typeFilter}` : "";
  filters += ratingFilter
    ? ratingFilter === "sfw"
      ? `&sfw`
      : `&rating=${ratingFilter}`
    : "";
  filters += genreFilter ? `&genres=${genreFilter}` : "";
  filters += minRange ? `&min_score=${minRange}` : "";
  filters += maxRange ? `&max_score=${maxRange}` : "";

  let filteredURL = url + filters;

  validateFetchData(filteredURL);
}

function validateFetchData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((responseData) => {
      if (responseData.pagination.items.count === 0) {
        displayNoResult();
      }
      lastPageNumber = responseData.pagination.last_visible_page;
      getData(url);
    })
    .catch(() => {
      console.warn();
    });
}

function getData(url) {
  let random = Math.floor(Math.random() * lastPageNumber + 1);
  if (lastPageNumber === 1) {
    random = 1;
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

function updateHTML() {
  clearDisplay();
  title.innerHTML = `<a href="${animeData.url}"><h2>${animeData.title}</h2></a>`;
  img.innerHTML = `<img src="${animeData.images.jpg.image_url}" />`;
  synopsis.innerText = animeData.synopsis;
  if (animeData.titles.length >= 1) {
    let titlesList = document.createElement("ul");

    for (let i = 1; i < animeData.titles.length; i++) {
      let item = animeData.titles[i];
      let listItem = document.createElement("li");
      listItem.textContent = item.type + ": " + item.title;
      titlesList.appendChild(listItem);
    }

    altTitles.appendChild(titlesList);
  } else {
    altTitles.innerHTML = `<ul><li>None found</li></ul>`;
  }

  

  mediaTypes.innerText = animeData.type ?? "None";
  rating.innerText = animeData.rating ?? "None";
  airing.innerText = animeData.aired.string ?? "None";
  score.innerText = animeData.score ?? "None";
  rank.innerText = animeData.rank ?? "None";
  duration.innerText = animeData.duration ?? "None";

  //themes list

  if (animeData.themes.length > 0) {
    let themesText = animeData.themes.map((item) => item.name).join(", ");
    themes.innerText = themesText;
  } else {
    themes.innerText = "None";
  }

  //genres list

  if (animeData.genres.length > 0) {
    let genresText = animeData.genres.map((item) => item.name).join(", ");
    genres.innerText = genresText;
  } else {
    genres.innerText = "None";
  }

  if (animeData.trailer.embed_url != null) {
    trailer.innerHTML = `
    <h3>Trailer</h3>
    <hr />
    <iframe width="420" height="315" title="YouTube video player" src=${animeData.trailer.embed_url}?autoplay=0 autoplay="false"> </iframe>
    `
  } else {
    trailer.innerHTML = null
  }
}

function displayNoResult() {
  clearDisplay();
  console.log("set this up pwease :3")
}

function clearDisplay () {
  title.innerHTML = ""
  img.innerHTML = ""
  synopsis.innerHTML = ""
  altTitles.innerHTML = ""
  mediaTypes.innerHTML = ""
  rating.innerHTML = ""
  themes.innerHTML = ""
  airing.innerHTML = ""
  score.innerHTML = ""
  rank.innerHTML = ""
  genres.innerHTML = ""
  duration.innerHTML = ""
  trailer.innerHTML = ""
}
