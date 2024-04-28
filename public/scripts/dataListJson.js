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
          var link = document.createElement('a');
          link.href = item.link;
          link.textContent = item.title;
          dt.appendChild(link);
          fragment.appendChild(dt); 

          //Create description & append
          var dd = document.createElement('dd');
          var description = item.description.split('\n');
          description.forEach(paragraph => {
            var p = document.createElement('p');
            p.textContent = paragraph;
            dd.appendChild(p);
          });

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
