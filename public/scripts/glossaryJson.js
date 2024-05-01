var bodyId = document.body.id;
var jsonFile = '/data/' + bodyId + '.json';

function fetchAndPopulateGlossary() {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // Iterate over each category
      Object.entries(data).forEach(([category, items]) => {
        var dl = document.querySelector('#' + category + ' dl');
        var fragment = document.createDocumentFragment(); // Create a DocumentFragment
        // Iterate over each item in the category
        items.forEach(item => {

          //Create term & append
          var dt = document.createElement('dt');
          dt.textContent = item.term;
          fragment.appendChild(dt); 

          //Create definition & append
          var dd = document.createElement('dd');
          var definition = item.definition.split('\n');
          definition.forEach(paragraph => {
            var p = document.createElement('p');
            p.innerHTML = paragraph;
            dd.appendChild(p);
          });

          //If links, add below definition
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
fetchAndPopulateGlossary();
