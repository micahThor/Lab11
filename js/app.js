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

// html elements
//
// img elements
Product.leftImage = document.getElementById('leftProduct');
Product.centerImage = document.getElementById('centerProduct');
Product.rightImage = document.getElementById('rightProduct');
// h3 elements
Product.leftImageH3Element = document.getElementById('leftProductH3tag');
Product.centerImageH3Element = document.getElementById('centerProducth3Tag');
Product.rightImageH3Element = document.getElementById('rightProducth3Tag');
// sidebar section element
Product.sideBarProductCount = document.getElementById('leftSideBar');

// add event listeners to img elements
Product.leftImage.addEventListener('click', clickHandler);
Product.centerImage.addEventListener('click', clickHandler);
Product.rightImage.addEventListener('click', clickHandler);


// function adds a product to list
Product.addProduct = function (product) {
  Product.productList.push(product);
};

// function returns a random product from the ProductManager's productlist
Product.getRandomProduct = function () {
  return Product.productList[Math.floor(Math.random() * Product.productList.length)];
};

// function gets random products for left,center,right img and h3 elements
Product.setRandomImages = function () {

  // gets three distinct products
  var randomLeftProduct = Product.getRandomProduct();
  var randomCenterProduct = Product.getRandomProduct();
  var randomRightProduct = Product.getRandomProduct();
  while (randomLeftProduct === randomCenterProduct) {
    randomCenterProduct = Product.getRandomProduct();
  }
  while (randomRightProduct === randomLeftProduct || randomRightProduct === randomCenterProduct) {
    randomRightProduct = Product.getRandomProduct();
  }

  // set left product img url and alt text
  Product.leftImage.src = randomLeftProduct.imgUrl;
  Product.leftImage.alt = randomLeftProduct.name;
  Product.leftImageH3Element.textContent = Product.leftImage.alt;
  // set center product img url and alt text
  Product.centerImage.src = randomCenterProduct.imgUrl;
  Product.centerImage.alt = randomCenterProduct.name;
  Product.centerImageH3Element.textContent = Product.centerImage.alt;
  // set right product img url and alt text
  Product.rightImage.src = randomRightProduct.imgUrl;
  Product.rightImage.alt = randomRightProduct.name;
  Product.rightImageH3Element.textContent = Product.rightImage.alt;

  // increase view count for selected products
  randomLeftProduct.viewCount++;
  randomRightProduct.viewCount++;
  randomCenterProduct.viewCount++;
};

// function displays vote data to sidebar
Product.setProductVoteData = function () {

  // get children list from sidebar
  var childrenList = Product.sideBarProductCount.childNodes;
  // iterate through children and add text content to p elements
  for (var productIndex = 0; productIndex < Product.productList.length; productIndex++) {
    childrenList[productIndex].textContent = `${Product.productList[productIndex].name} has ${Product.productList[productIndex].clickCount} votes and was shown ${Product.productList[productIndex].viewCount} times`;
  }
};

// function gets user's clicked image and increases that product's vote count
function clickHandler(event) {

  // get alt text for selected image and find match of text in product list
  var selectedImageAltText = event.target.alt;
  for (var productIndex = 0; productIndex < Product.productList.length; productIndex++) {
    if (selectedImageAltText === Product.productList[productIndex].name) {
      Product.productList[productIndex].clickCount++;
    }
  }

  // increase total vote count
  Product.totalVoteCount++;

  // remove listeners after user reaches maximum vote and display vote data
  if (Product.totalVoteCount === Product.maxVoteCount) {
    Product.leftImage.removeEventListener('click', clickHandler);
    Product.centerImage.removeEventListener('click', clickHandler);
    Product.rightImage.removeEventListener('click', clickHandler);
    Product.setProductVoteData();
  } else {
    Product.setRandomImages();
  }
}

// call main
main();


