function toggleContent(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i.material-icons');

    if (content.style.display === "none") {
        content.style.display = "block";
        icon.textContent = "unfold_less"; // Change icon to unfold_less
    } else {
        content.style.display = "none";
        icon.textContent = "unfold_more"; // Change icon to unfold_more
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('/quick-access.txt')
      .then(response => response.text())
      .then(data => {
          document.getElementById('quick-access').innerHTML = data;
      });

    const collapsibleHeaders = document.querySelectorAll('.text-header.collapsible');

    collapsibleHeaders.forEach(header => {
        // Check if the header already contains the icon span
        if (!header.querySelector('span > i.material-icons')) {
            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '<i class="material-icons">unfold_more</i>';
            header.querySelector('h2').appendChild(iconSpan);
        }

        header.addEventListener('click', function() {
            toggleContent(this);
        });
    });
});