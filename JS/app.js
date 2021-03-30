/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

let leftIndex;
let midIndex;
let rightIndex;
let numRounds = 25;
let diffLeftImg;
let diffMidImg;
let diffRightImg;
let votesChart =[];
let viewsChart =[];

const itemNames =['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
  'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb',
  'water-can', 'wine-glass'];
const nameExt = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

function Items(name, nameExt){
  this.name = name;
  this.path = `./images/${nameExt}`;
  this.votes = 0;
  this.shown = 0;
  Items.all.push(this);
}
Items.all = [];

for(let i=0; i<itemNames.length; i++){
  new Items(itemNames[i], nameExt[i]);
}


const leftImage = document.getElementById('product1');
const midImage = document.getElementById('product2');
const rightImage = document.getElementById('product3');
const section = document.getElementById('products');

function randomNumb(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(){
  diffLeftImg = leftIndex;
  do {
    leftIndex = randomNumb(Items.all.length-1, 0);
    leftImage.src = Items.all[leftIndex].path;
    leftImage.alt = Items.all[leftIndex].name;
    leftImage.title = Items.all[leftIndex].name;
  }while(diffLeftImg === leftIndex || leftIndex === diffMidImg || leftIndex === diffRightImg);
  Items.all[leftIndex].shown +=1;
  diffMidImg = midIndex;
  do{
    midIndex = randomNumb(Items.all.length-1, 0);
    midImage.src = Items.all[midIndex].path;
    midImage.alt = Items.all[midIndex].name;
    midImage.title = Items.all[midIndex].name;
  }while(midIndex === leftIndex || midIndex === diffMidImg || midIndex === diffLeftImg || midIndex === diffRightImg);
  Items.all[midIndex].shown +=1;
  do{
    rightIndex = randomNumb(Items.all.length-1, 0);
    rightImage.src = Items.all[rightIndex].path;
    rightImage.alt = Items.all[rightIndex].name;
    rightImage.title = Items.all[rightIndex].name;
  }while(rightIndex === leftIndex || rightIndex === midIndex || rightIndex === diffRightImg || rightIndex === diffMidImg || rightIndex === diffLeftImg);
  Items.all[rightIndex].shown +=1;
}

section.addEventListener('click', voting);

function voting(event){
  if(event.target.id !== 'products'){
    if(event.target.id === leftImage.id){
      Items.all[leftIndex].votes++;
    }else if(event.target.id === midImage.id){
      Items.all[midIndex].votes++;
    }else{
      Items.all[rightIndex].votes++;
    }
    render();
    numRounds -=1;
    if (numRounds === 0) {
      section.removeEventListener('click', voting);
      compute();
    }
  }
  render();
}
render();

function compute(){
  const list = document.getElementById('list');
  const table = document.createElement('ul');
  list.appendChild(table);
  for(let i=0; i<Items.all.length; i++){
    votesChart.push(Items.all[i].votes);
    viewsChart.push(Items.all[i].shown);
    const elList = document.createElement('li');
    table.appendChild(elList);
    elList.textContent = `${Items.all[i].name} had ${Items.all[i].votes} vote/s, and was seen ${Items.all[i].shown} times.`;
  }
  barChart;
}
render();


function barChart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesChart
      },
      {
        label: 'Views',
        backgroundColor: 'yellow',
        borderColor: 'rgb(255, 99, 132)',
        data: votesChart
      }
      ]
    },

    // Configuration options go here
    options: {}
  });
}
