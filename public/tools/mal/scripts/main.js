
// Populate the genre dropdown from JSON 
function generateGenreList() {
  let selectElement = document.getElementById("genre-filter");
  const genreListJson = "./data/animeGenres.json";

  fetch(genreListJson)
    .then((response) => {
      if (!response.ok) {
        throw new Error("NETWORK ERROR: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Sort by alphabet
      data.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      // Put any genre back on top
      data.sort((a, b) => {
        if (b.value == "") return 1;
      });

      data.forEach((genre) => {
        const optionElement = document.createElement("option");
        optionElement.value = genre.value;
        optionElement.text = genre.name;
        selectElement.add(optionElement);
      });
    })
    .catch((error) => {
      console.error(
        "GENRE FETCHING ERROR: ",
        error
      );
    });
}


// Event listener to generate genre list
document.addEventListener("DOMContentLoaded", function () {
  generateGenreList();
});
