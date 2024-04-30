// const header = document.querySelector('.header');
const sidebar = document.getElementById('quick-access');
const header = document.querySelector('nav');

function loadHeader() {
    console.log(header);
    header.innerHTML = 
    `
        <a href="/" class="button">Home</a>
        <a href="/resources" class="button">Resources</a>
        <a href="/about.html" class="button">About</a>
        <a href="/contact.html" class="button">Contact</a>
    `
}

function loadSidebar() {
    sidebar.innerHTML +=
    `
    <ul class="quick-access-list">
        <li><a href="/resources/comms.html">Commission Services</a></li>
        <li><a href="/resources/zines.html">Zine Making & Printing</a></li>
        <li><a href="/resources/storefronts.html">Digital Storefronts</a></li> 
        <li><a href="/resources/merchandise.html">Merchandise Printing</a></li>
        <li><a href="/resources/local.html">Local Resources</a></li>
        <li>Personal Site & Portfolio (WIP)</li>
        <li>Local Communities (WIP)</li>
    </ul>   
    `
}

loadHeader();
loadSidebar();

// <a href="/blog.html" class="button">Blog</a>