import ColorThief from "./color-thief.js"
import Pixelate from "./pixelator.js";

const colorThief = new ColorThief();

const imgForm = {
  imgDiv: document.getElementById("imgDiv"),
  paletteNumber: 5,
  type: null,

  init: (type) => { 
    imgForm.type = type;
    form.reset(); 
    document.getElementById("resetBtn").addEventListener("click", (ev) => {
      ev.preventDefault();
      form.reset();
    })
    document.getElementById("submitBtn").addEventListener("click", (ev) => {
      ev.preventDefault();
      imgForm.fileSubmit();
    })
  },

  

  fileSubmit: () => {
    let uploadImage = form[0].files[0];
    imgForm.paletteNumber = Number(form[1].value);
    // Validate if a file was uploaded
    if (!uploadImage) {
      console.error("No file selected");
      return;
    }

    // Check if the uploaded file is an image
    if (uploadImage.type.substr(0, 5) !== "image") {
      console.error("Only images allowed");
      return;
    }

    let img = document.createElement("img");
    getBase64(uploadImage)
    .then((data) => {
      img.src = data;
      imgDiv.innerHTML = "";
      imgDiv.appendChild(img);
      
      img.addEventListener('load', function() {
        switch(imgForm.type) {
          case "palette-picker":
            palettePicker.getImageColors(img, imgForm.paletteNumber);
            break;
          case "pixelator":
            pixelator.getInfo();
            break;
          default:
            console.log(imgForm.type);
        } 
        
      });
      
    });
  }
}

const palettePicker = {
  displayColors: (colors) => {
    const colorsDiv = document.getElementById('colors');
    colorsDiv.innerHTML = ''; // Clear previous colors
  
    const addColorBox = (color) => {
      const hexColor = rgbToHex(color[0], color[1], color[2]);
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.innerHTML = hexColor;
      div.className = 'color-box';
      div.style.backgroundColor = hexColor;
      div.title = hexColor;
      div.appendChild(p);
      colorsDiv.appendChild(div);
    };
  
    if (typeof colors[0] === "number") {
      addColorBox(colors);
    } else {
      colors.forEach(addColorBox);
    }
  },

  getImageColors: (img, number) => {
    let colors;
    if (number == 1 ) {
      colors = colorThief.getColor(img);
    } else {
      colors = colorThief.getPalette(img, number); // Get 2-15
    }
    palettePicker.displayColors(colors);
  },
}

const pixelator = {
  getInfo: () => {
    let quality = [...form.elements].filter((input) => input.checked)[0].id // Here you filter the inputs to get the checked value
    const img = imgForm.imgDiv.firstChild;
    pixelator.pixelateImg(img, quality);
  },
  pixelateImg: (img, quality) => {
    let decimal;
    if (typeof quality === "number") {decimal = quality} else {
      if (quality === "low") { decimal = 0.8 } else if (quality === "medium") { decimal = 0.9 } else { decimal = 0.95 }
    }
    let pixelImg = new Pixelate(img, { amount: decimal });
  },
}

const collapsibles = {
  toggleContent: (element) => {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i.material-icons');

    if (content.style.display === "none") {
        content.style.display = "block";
        icon.textContent = "unfold_less"; 
    } else {
        content.style.display = "none";
        icon.textContent = "unfold_more"; 
    }
  },
  init: () => {
    const collapsibleHeaders = document.querySelectorAll('.collapsible');

    collapsibleHeaders.forEach(header => {
        // Check if the header already contains the icon span
        if (!header.querySelector('span > i.material-icons')) {
            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '<i class="material-icons">unfold_less</i>';
            header.querySelector('h3').appendChild(iconSpan);
        }

        header.addEventListener('click', function() {
            collapsibles.toggleContent(this);
        });
    });
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  if (form) { imgForm.init(form.dataset.type); }
  if (document.querySelector('.collapsible')) { collapsibles.init() }
});
