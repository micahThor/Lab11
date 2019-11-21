'use strict';

//////////////////////////////////////////////
//    FUNCTION SECTION
//////////////////////////////////////////////

// function starts program
function main() {

  // check local storage for product data
  if (localStorage.getItem('productData') !== null) {

    // get products from local storage
    var localStorageProductData = localStorage.getItem('productData');
    var parsedProductData = JSON.parse(localStorageProductData);

    // populate array with products from storage
    for (var productIdx = 0; productIdx < parsedProductData.length; productIdx++) {
      Product.addProduct(new Product(parsedProductData[productIdx].name, parsedProductData[productIdx].imgUrl, parsedProductData[productIdx].clickCount, parsedProductData[productIdx].viewCount));
    }

    // set initial images on page load
    Product.setRandomImages();

  } else {
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


}

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

  // if user reaches max vote -- remove listeners, save to local storage, and draw canvas
  // else -- keep showing images
  if (Product.totalVoteCount === Product.maxVoteCount) {
    Product.leftImage.removeEventListener('click', clickHandler);
    Product.centerImage.removeEventListener('click', clickHandler);
    Product.rightImage.removeEventListener('click', clickHandler);

    var ProductJSON = JSON.stringify(Product.productList);
    localStorage.setItem('productData', ProductJSON);

    renderVoterDataOnCanvas();
  } else {
    Product.setRandomImages();
  }
}

// function takes an array and randomizes the element indexes from their original position
function shuffleArray(arr) {

  for (var i = arr.length - 1; i > 0; i--) {
    // pick a random element index from 0 to i
    var j = Math.floor((Math.random() * i));
    // swap elements in array 
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// function displays vote data to page
function renderVoterDataOnCanvas() {


  // auxiliary arrays for getting individual product data
  
  var productNameArray = [];
  var productLikesArray = [];
  var productViewsArray = [];


  // product name data
  for (var i = 0; i < Product.productList.length; i++) {
    productNameArray.push(Product.productList[i].name);
  }


  // product vote data
  for (var i = 0; i < Product.productList.length; i++) {
    productLikesArray.push(Product.productList[i].clickCount);
  }

  // product view data
  for (var i = 0; i < Product.productList.length; i++) {

    productViewsArray.push(Product.productList[i].viewCount);
  }

  var ctx = Product.canvasElement.getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: productNameArray,
      datasets: [{
        label: 'Vote Count',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: productLikesArray
      }, {
        label: 'View Count',
        backgroundColor: 'blue',
        data: productViewsArray
      }]
    }
  });
}


//////////////////////////////////////////////
//  OBJECT SECTION
//////////////////////////////////////////////

// Product represents an item in store
function Product(name, imgUrl, clickCount = 0, viewCount = 0) {
  // instance variables
  this.name = name;
  this.imgUrl = imgUrl;
  // counters for click and views
  this.clickCount = clickCount;
  this.viewCount = viewCount;
}

// list of all products
Product.productList = [];
// list for tracking VIEWED products within 2 rounds of voting
Product.workingProductList = [];
// list for last three items displayed
Product.lastThreeProductsDisplayedList = [];
// amount of total votes cast by user
Product.totalVoteCount = 0;
// maximum allowed votes
Product.maxVoteCount = 25;

// html elements
//
// img elements
Product.leftImage = document.getElementById('leftProduct');
Product.centerImage = document.getElementById('centerProduct');
Product.rightImage = document.getElementById('rightProduct');
// h3 elements
Product.leftImageSpanElement = document.getElementById('leftProductSpantag');
Product.centerImageSpanElement = document.getElementById('centerProductSpantag');
Product.rightImageSpanElement = document.getElementById('rightProductSpantag');
// canvas element
Product.canvasElement = document.getElementById('canvas');

// add event listeners to img elements
Product.leftImage.addEventListener('click', clickHandler);
Product.centerImage.addEventListener('click', clickHandler);
Product.rightImage.addEventListener('click', clickHandler);


// function adds a product to list
Product.addProduct = function (product) {
  Product.productList.push(product);
};

// function returns a random product from the ProductManager's productlist=
Product.getRandomProduct = function () {

  // working product list gets copies all products if working product list is zero or if product list is less than 4.  Then shuffles array elements in random order.
  if (Product.workingProductList.length === 0 || Product.workingProductList.length < 4) {
    Product.workingProductList = Product.productList.slice();
    shuffleArray(Product.workingProductList);
  }

  // get last product from shuffled array
  var randomProduct = Product.workingProductList.pop();

  // if current randomProduct matches a product from lastThreeProductDisplay array, get next product
  while (Product.lastThreeProductsDisplayedList.includes(randomProduct)) {
    randomProduct = Product.workingProductList.pop();
  }

  return randomProduct;
};

// function gets random products for left,center,right img and h3 elements
Product.setRandomImages = function () {

  // gets three distinct products
  var randomLeftProduct = Product.getRandomProduct();
  var randomCenterProduct = Product.getRandomProduct();
  var randomRightProduct = Product.getRandomProduct();
  
  // populate array with currently selected products
  Product.lastThreeProductsDisplayedList = [randomLeftProduct, randomCenterProduct, randomRightProduct];

  // set left product img url and alt text
  Product.leftImage.src = randomLeftProduct.imgUrl;
  Product.leftImage.alt = randomLeftProduct.name;
  Product.leftImageSpanElement.textContent = Product.leftImage.alt;
  // set center product img url and alt text
  Product.centerImage.src = randomCenterProduct.imgUrl;
  Product.centerImage.alt = randomCenterProduct.name;
  Product.centerImageSpanElement.textContent = Product.centerImage.alt;
  // set right product img url and alt text
  Product.rightImage.src = randomRightProduct.imgUrl;
  Product.rightImage.alt = randomRightProduct.name;
  Product.rightImageSpanElement.textContent = Product.rightImage.alt;

  // increase view count for selected products
  randomLeftProduct.viewCount++;
  randomRightProduct.viewCount++;
  randomCenterProduct.viewCount++;
};


// call main
main();


