function fetchSidebar() {
  document.getElementById("sidebar").innerHTML = `
  <h1>Randomizer Settings</h1>
  <div class="filter-options">
    <select id="type-filter">
      <option value="">Any Type</option>
      <option value="tv">TV</option>
      <option value="movie">Movie</option>
      <option value="ova">OVA</option>
      <option value="special">Special</option>
      <option value="ona">ONA</option>
      <option value="music">Music</option>
    </select>

    <select id="rating-filter">
      <option value="sfw">Exclude Hentai</option>
      <option value="">Any Rating</option>
      <option value="g">G - All Ages</option>
      <option value="pg">PG - Children</option>
      <option value="pg13">PG-13 - Teens 13 or older</option>
      <option value="r17">R-17+ (violence & profanity)</option>
      <option value="r">R+ - Mild Nudity</option>
      <option value="rx">Rx - Hentai</option>
    </select>

    <select id="genre-filter"></select>

    <select id="min-range">
      <option value="">Select a Minimum Score</option>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>

    <select id="max-range">
      <option value="">Select a Maximum Score</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option> 
    </select>
  </div>
  <button id="fetchButton">Randomize!</button>
    `;
}
fetchSidebar();