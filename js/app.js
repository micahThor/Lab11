'use strict';

function main() {
  // create product manager and add products
  var productMgr = new ProductManager();

  productMgr.addProduct(new Product('bag', 'img/bag.jpg'));
  productMgr.addProduct(new Product('banana', 'img/banana.jpg'));
  productMgr.addProduct(new Product('bathroom', 'img/bathroom.jpg'));
  productMgr.addProduct(new Product('boots', 'img/boots.jpg'));
  productMgr.addProduct(new Product('breakfast', 'img/breakfast.jpg'));
  productMgr.addProduct(new Product('bubblegum', 'img/bubblegum.jpg'));
  productMgr.addProduct(new Product('chair', 'img/chair.jpg'));
  productMgr.addProduct(new Product('cthulhu', 'img/cthulhu.jpg'));
  productMgr.addProduct(new Product('dog-duck', 'img/dog-duck.jpg'));
  productMgr.addProduct(new Product('dragon', 'img/dragon.jpg'));
  productMgr.addProduct(new Product('pen', 'img/pen.jpg'));
  productMgr.addProduct(new Product('pet-sweep', 'img/pet-sweep.jpg'));
  productMgr.addProduct(new Product('scissors', 'img/scissors.jpg'));
  productMgr.addProduct(new Product('shark', 'img/shark.jpg'));
  productMgr.addProduct(new Product('sweep', 'img/sweep.png'));
  productMgr.addProduct(new Product('tauntaun', 'img/tantaun.jpg'));
  productMgr.addProduct(new Product('unicorn', 'img/unicorn.jpg'));
  productMgr.addProduct(new Product('usb', 'img/usb.gif'));
  productMgr.addProduct(new Product('water-can', 'img/water-can.jpg'));
  productMgr.addProduct(new Product('wine-glass', 'img/wine-glass.jpg'));

  
}

// Product represents an item in store
function Product(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
  this.clickCount = 0;
  this.viewCount = 0;
}

function ProductManager() {
  this.productList = [];
  this.totalVoteCount = 0;
}

ProductManager.prototype.addProduct(product) {
  this.productList.push(product);
}




// call main
main();