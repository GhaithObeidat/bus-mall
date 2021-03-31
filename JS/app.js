'use strict';

let leftIndex;
let rightIndex;
let centerIndex;
let maxNumOfClicks = 0;
let myVotes = [];
let myViews = [];
let arrcheck = [];
const product = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
  'sweep',
  'usb'
];

const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const section = document.getElementById('images-section');
const button = document.getElementById('btn');


function Mall(productName) {
  this.productName = productName;
  this.path = `./images/${productName}.jpg`;
  this.votes = 0;
  this.views = 0;
  Mall.all.push(this);
}
Mall.all = [];

for (let i = 0; i < product.length; i++) {
  new Mall(product[i]);
}
console.log(Mall.all);

function render() {
  arrcheck = [];
  do {
    leftIndex = randomNumber(0, Mall.all.length - 1);
    centerIndex = randomNumber(0, Mall.all.length - 1);
    rightIndex = randomNumber(0, Mall.all.length - 1);
    if (arrcheck.includes(leftIndex) || arrcheck.includes(centerIndex) || arrcheck.includes(rightIndex)) {
      leftIndex = randomNumber(0, Mall.all.length - 1);
      centerIndex = randomNumber(0, Mall.all.length - 1);
      rightIndex = randomNumber(0, Mall.all.length - 1);
    }
    arrcheck.push(leftIndex, centerIndex, rightIndex);
    console.log(arrcheck);
  } while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex);


  leftImage.src = Mall.all[leftIndex].path;
  leftImage.alt = Mall.all[leftIndex].productName;
  leftImage.title = Mall.all[leftIndex].productName;

  rightImage.src = Mall.all[rightIndex].path;
  rightImage.alt = Mall.all[rightIndex].productName;
  rightImage.title = Mall.all[rightIndex].productName;

  centerImage.src = Mall.all[centerIndex].path;
  centerImage.alt = Mall.all[centerIndex].productName;
  centerImage.title = Mall.all[centerIndex].productName;



}

section.addEventListener('click', clicking);
function clicking(event) {
  // if((rightImage.src !== leftImage.src) && (leftImage.src !== centerImage.src) && (centerImage.src !== rightImage.src)){
  if (event.target.id !== 'images-section') {
    if (event.target.id === rightImage.id) {
      Mall.all[rightIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;

    }
    else if (event.target.id === leftImage.id) {
      Mall.all[leftIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;
    }
    else {
      Mall.all[centerIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;
    }
  }
  if (maxNumOfClicks <= 25) {
    render();
  }
  else {
    section.removeEventListener('click', clicking);
  }

}
button.addEventListener('click', results);
function results() {
  const articleEL = document.getElementById('article');
  const ul = document.createElement('ul');
  articleEL.appendChild(ul);
  for (let i = 0; i < product.length; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Mall.all[i].productName} had ${Mall.all[i].votes} votes, and was seen ${Mall.all[i].views} times.`;
    myVotes.push(Mall.all[i].votes);
    myViews.push(Mall.all[i].views);
  }
  chartFun();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

render();

function chartFun() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: product,
      datasets: [{
        label: 'Product votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: myVotes
      },
      {
        label: 'Product views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: myViews
      }]
    },

    // Configuration options go here
    options: {}
  });
}
