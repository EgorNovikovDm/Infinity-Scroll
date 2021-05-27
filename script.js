// Unsplash APi
const count = 30;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Check if all images where loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length;
  // run function for each object 
  photosArray.forEach((photo) => {
    //create <a>
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      targer: '_blank',
    })
    // create <img>
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      })
      // Event Listner
      img.addEventListener('load', imageLoaded)
    // Put <img>
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      console.log(error);
      // Catch Error Here
    }
  }

  // Check to see if scrolling near bottom of page, Loader More Photos
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
  });

//On Load
getPhotos();