'use strict';

function main() {
  // create product manager and add products
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
  this.clickCount = 0;
  this.viewCount = 0;
}

// 
Product.clickCount = 0;

// The amount of total votes
Product.totalVoteCount = 0;
// The maximum allowed votes
Product.maxVoteCount = 25;

Product.productList = [];

Product.addProduct = function(product) {
  Product.productList.push(product);
}

// set html img element variables
Product.leftImage = document.getElementById('leftProduct');
Product.centerImage = document.getElementById('centerProduct');
Product.rightImage = document.getElementById('rightProduct');
// add event listeners to img elements
Product.leftImage.addEventListener('click', clickHandler);
Product.centerImage.addEventListener('click', clickHandler);
Product.rightImage.addEventListener('click', clickHandler);


// Function getRandomProductImage returns a random product from the ProductManager's productlist
Product.getRandomProductImage = function () {
  return Product.productList[Math.floor(Math.random() * Product.productList.length)].imgUrl;
}

Product.setRandomImages = function () {
  Product.leftImage.src = Product.getRandomProductImage();
  Product.centerImage.src = Product.getRandomProductImage();
  Product.rightImage.src = Product.getRandomProductImage();
}


function clickHandler(event) {
  console.log(event.target.alt);
  Product.setRandomImages();
}





// call main
main();