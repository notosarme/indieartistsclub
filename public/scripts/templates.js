// const header = document.querySelector('.header');
const sidebar = document.getElementById('quick-access');

function loadSidebar() {
    sidebar.innerHTML +=
    `
    <ul class="quick-access-list">
        <li><a href="/resources/comms.html">Commission Services</a></li>
        <li><a href="/resources/zines.html">Zine Making & Printing</a></li>
        <li><a href="/resources/storefronts.html">Digital Storefronts</a></li> 
        <li><a href="/resources/merchandise.html">Merchandise Printing</a></li>
        <li>Personal Site & Portfolio (WIP)</li>
        <li>Local Communities (WIP)</li>
    </ul>   
    `
}

loadSidebar();