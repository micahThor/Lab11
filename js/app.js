'use strict';

function main() {
  // create and add products
  Product.addProduct(new Product('bag', 'img/bag.jpg'));
  Product.addProduct(new Product('banana', 'img/banana.jpg'));
  Product.addProduct(new Product('bathroom', 'img/bathroom.jpg'));
  Product.addProduct(new Product('boots', 'img/boots.jpg'));
  Product.addProduct(new Product('breakfast', 'img/breakfast.jpg'));
  Product.addProduct(new Product('bubblegum', 'img/bubblegum.jpg'));
  Product.addProduct(new Product('chair', 'img/chair.jpg'));
  Product.addProduct(new Product('cthulhu', 'img/cthulhu.jpg'));
  Product.addProduct(new Product('dog-duck', 'img/dog-duck.jpg'));
  Product.addProduct(new Product('dragon', 'img/dragon.jpg'));
  Product.addProduct(new Product('pen', 'img/pen.jpg'));
  Product.addProduct(new Product('pet-sweep', 'img/pet-sweep.jpg'));
  Product.addProduct(new Product('scissors', 'img/scissors.jpg'));
  Product.addProduct(new Product('shark', 'img/shark.jpg'));
  Product.addProduct(new Product('sweep', 'img/sweep.png'));
  Product.addProduct(new Product('tauntaun', 'img/tauntaun.jpg'));
  Product.addProduct(new Product('unicorn', 'img/unicorn.jpg'));
  Product.addProduct(new Product('usb', 'img/usb.gif'));
  Product.addProduct(new Product('water-can', 'img/water-can.jpg'));
  Product.addProduct(new Product('wine-glass', 'img/wine-glass.jpg'));

  // set initial images on page load
  Product.setRandomImages();
}

// Product represents an item in store
function Product(name, imgUrl) {
  // instance variables
  this.name = name;
  this.imgUrl = imgUrl;
  // counters for click and views
  this.clickCount = 0;
  this.viewCount = 0;
}

// The list of products
Product.productList = [];
// The amount of total votes cast by user
Product.totalVoteCount = 0;
// The maximum allowed votes
Product.maxVoteCount = 25;

// set html img element variables
Product.leftImage = document.getElementById('leftProduct');
Product.centerImage = document.getElementById('centerProduct');
Product.rightImage = document.getElementById('rightProduct');

// set html h3 element variables
Product.leftImageAltText = document.getElementById('leftProductAlt');
Product.centerImageAltText = document.getElementById('centerProductAlt');
Product.rightImageAltText = document.getElementById('rightProductAlt');

// set html sidebar section element
Product.sideBarProductCount = document.getElementById('leftSideBar');

// add event listeners to img elements
Product.leftImage.addEventListener('click', clickHandler);
Product.centerImage.addEventListener('click', clickHandler);
Product.rightImage.addEventListener('click', clickHandler);


// function adds a product to list
Product.addProduct = function (product) {
  Product.productList.push(product);
}

// function getRandomProductImage returns a random product from the ProductManager's productlist
Product.getRandomProduct = function () {
  return Product.productList[Math.floor(Math.random() * Product.productList.length)];
}

// function gets random products for left,center,right img and h3 elements
// sets src and alt attributes
// increases view count
Product.setRandomImages = function () {
  // left product
  var randomLeftImage = Product.getRandomProduct();
  Product.leftImage.src = randomLeftImage.imgUrl;
  Product.leftImage.alt = randomLeftImage.name;
  Product.leftImageAltText.textContent = Product.leftImage.alt;

  // center product
  var randomCenterImage = Product.getRandomProduct();
  Product.centerImage.src = randomCenterImage.imgUrl;
  Product.centerImage.alt = randomCenterImage.name;
  Product.centerImageAltText.textContent = Product.centerImage.alt;

  // right product
  var randomRightImage = Product.getRandomProduct();
  Product.rightImage.src = randomRightImage.imgUrl;
  Product.rightImage.alt = randomRightImage.name;
  Product.rightImageAltText.textContent = Product.rightImage.alt;

  // increase view count for selected products
  randomLeftImage.viewCount++;
  randomRightImage.viewCount++;
  randomCenterImage.viewCount++;
}

// function gets user's clicked image and increases that product's vote count
function clickHandler(event) {

  // tracks node location in sidebar list
  var spanElementNodeNumber;
  // get alt text for selected image and find match of text in product list
  var selectedImageAltText = event.target.alt;
  for (var productIndex = 0; productIndex < Product.productList.length; productIndex++) {
    if (selectedImageAltText === Product.productList[productIndex].name) {
      Product.productList[productIndex].clickCount++;
      spanElementNodeNumber = productIndex + 1;
    }
  }

  // TO DO
  // increase side bar product vote count
  


  // reset spanElement to 0 for next click
  spanElementNodeNumber = 0;

  // increase total vote count
  Product.totalVoteCount++

  // check if user has more votes to cast
  // if no more counts, remove event listeners
  if (Product.totalVoteCount === Product.maxVoteCount) {
    Product.leftImage.removeEventListener('click', clickHandler);
    Product.centerImage.removeEventListener('click', clickHandler);
    Product.rightImage.removeEventListener('click', clickHandler);
  } else {
    Product.setRandomImages();
  }
}

// call main
main();