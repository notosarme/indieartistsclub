function fetchSidebar() {
  document.getElementById("sidebar").innerHTML = `
  <h1>Randomizer Settings</h1>
  <div class="filter-options">
    <select id="type-filter">
      <option value="">Any Type</option>
      <option value="manga">Manga</option>
      <option value="novel">Novel</option>
      <option value="lightnovel">Light Novel</option>
      <option value="oneshot">Oneshot</option>
      <option value="doujin">Doujin</option>
      <option value="manhwa">Manhwa</option>
      <option value="manhua">Manhua</option>
    </select>

    <select id="rating-filter">
      <option value="sfw">SFW</option>
      <option value="">Any Rating</option>
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