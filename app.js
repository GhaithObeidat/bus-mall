'use strict';

// defining global variables for use in functions
let leftIndex; //            left image index
let midIndex; //             middle image index
let rightIndex; //           right image index
let numRounds = 0; //        number of rounds counter
let results; //              results of the voting

// products names
const productNames =['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
  'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb',
  'water-can', 'wine-glass'];

//products constructor
function Items(name){
  this.name = name;
  this.path = `./images/${name}.jpg`;
  this.votes = 0;
  this.shown = 0;
  Items.all.push(this);
}
Items.all = [];

// creating product objects
for(let i=0; i<productNames.length; i++){
  new Items(productNames[i]);
}

// console.table(Items.all);

// retrieving HTML elements
const leftImage = document.getElementById('product1');
const midImage = document.getElementById('product2');
const rightImage = document.getElementById('product3');
const section = document.getElementById('products');
const result = document.getElementById('result');

//generating a random number
function randomNumb(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// rendering 3 images
function display(){
  // rendering the left image
  leftIndex = randomNumb(Items.all.length-1, 0);
  leftImage.src = Items.all[leftIndex].path;
  leftImage.alt = Items.all[leftIndex].name;
  leftImage.title = Items.all[leftIndex].name;
  Items.all[leftIndex].shown +=1;
  // assuring that mid image is different
  do{
    // rendering the middle image
    midIndex = randomNumb(Items.all.length-1, 0);
    midImage.src = Items.all[midIndex].path;
    midImage.alt = Items.all[midIndex].name;
    midImage.title = Items.all[midIndex].name;
  }while(midIndex === leftIndex);
  Items.all[midIndex].shown +=1;
  // assuring that left and mid images are not ad right image
  do{
  // rendering the right image
    rightIndex = randomNumb(Items.all.length-1, 0);
    rightImage.src = Items.all[rightIndex].path;
    rightImage.alt = Items.all[rightIndex].name;
    rightImage.title = Items.all[rightIndex].name;
  }while(rightIndex === leftIndex || rightIndex===midIndex);
  Items.all[rightIndex].shown +=1;
}
// display();
// console.table(ProDis.all);

// crating an event
section.addEventListener('click', voting);

// creating a voting function
function voting(event){
  if(event.target.id !== 'products'){
    if(event.target.id === leftImage.id){
      Items.all[leftIndex].votes++;
    }else if(event.target.id === midImage.id){
      Items.all[midIndex].votes++;
    }else{
      Items.all[rightIndex].votes++;
    }
    display();
    numRounds +=1;
    // showing a button when reaching the decided rounds number
    if (numRounds === 25) {
      results = document.createElement('button');
      result.appendChild(results);
      results.textContent='Results !';
      // creating an event when pressing on the button
      results.addEventListener('click', compute);
    }
    // console.table(ProDis.all);
  }
}


// creating a function that will display the results
// eslint-disable-next-line no-unused-vars
function compute(_event){
  const table = document.createElement('ul');
  result.appendChild(table);
  for(let i=0; i<Items.all.length; i++){
    const elList = document.createElement('li');
    table.appendChild(elList);
    elList.textContent = `${Items.all[i].name} had ${Items.all[i].votes} vote/s, and was seen ${Items.all[i].shown} times.`;
  }
}
// displaying for the first time
display();