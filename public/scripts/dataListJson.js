var bodyId = document.body.id;
var jsonFile = '/data/' + bodyId + '.json';

function fetchDataAndPopulateDL() {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // Iterate over each category
      Object.entries(data).forEach(([category, items]) => {
        var dl = document.querySelector('#' + category + ' dl');
        var fragment = document.createDocumentFragment(); // Create a DocumentFragment
        // Iterate over each item in the category
        items.forEach(item => {

          //Create title & append
          var dt = document.createElement('dt');
          if (item.link) {
            var link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.title;
            dt.appendChild(link);
          } else {
            dt.textContent = item.title;
          }
          fragment.appendChild(dt); 

          //Create description & append
          var dd = document.createElement('dd');
          var description = item.description.split('\n');
          description.forEach(paragraph => {
            var p = document.createElement('p');
            p.innerHTML = paragraph;
            dd.appendChild(p);
          });

          //If links, add below description
          if (item.links && item.links.length > 0) {
            var linksParagraph = document.createElement('p');
            item.links.forEach((link, index) => {
              var a = document.createElement('a');
              a.href = link.link;
              a.textContent = link.title;
              linksParagraph.appendChild(a);
              if (index < item.links.length - 1) {
                linksParagraph.appendChild(document.createTextNode(' | '));
              }
            });
            dd.appendChild(linksParagraph);
          }

          //If image, add on last
          if (item.image) {
            var img = document.createElement('img');
            img.src = item.image;
            dd.appendChild(img);
          }

          fragment.appendChild(dd); // Append to the DocumentFragment
        });
        dl.appendChild(fragment); // Append all elements to the DL at once
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch data and populate the <dl> element
fetchDataAndPopulateDL();
