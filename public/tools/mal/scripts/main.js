
// Function to populate the genre dropdown from a JSON file
function generateGenreList() {
  let selectElement = document.getElementById("genre-filter");
  const genreListJson = "/data/animeGenres.json";

  fetch(genreListJson)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((genre) => {
        const optionElement = document.createElement("option");
        optionElement.value = genre.value;
        optionElement.text = genre.name;
        selectElement.add(optionElement);
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}


// Event listener to generate genre list and set up fetch button event
document.addEventListener("DOMContentLoaded", function () {
  generateGenreList();
});
