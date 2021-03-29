'use strict';

let leftIndex;
let midIndex;
let rightIndex;
let numRounds = 25;
let results;
let diffLeftImg;
let diffMidImg;
let diffRightImg;
let votesChart =[];
let viewsChart =[];

const itemNames =['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
  'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb',
  'water-can', 'wine-glass'];

function Items(name){
  this.name = name;
  this.path = `./images/${name}.jpg`;
  this.votes = 0;
  this.shown = 0;
  Items.all.push(this);
}
Items.all = [];

for(let i=0; i<itemNames.length; i++){
  new Items(itemNames[i]);
}


const leftImage = document.getElementById('product1');
const midImage = document.getElementById('product2');
const rightImage = document.getElementById('product3');
const section = document.getElementById('products');
const result = document.getElementById('result');

function randomNumb(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function display(){
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

  diffRightImg = rightIndex;
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

  results.addEventListener('click', compute);
  compute();
}
function compute(){
  const list = document.getElementById('list');
  const table = document.createElement('ul');
  for(let i=0; i<Items.all.length; i++){
    // setting votesChart and viewsChart data
    votesChart.push(Items.all[i].votes);
    viewsChart.push(Items.all[i].shown);
    const elList = document.createElement('li');
    table.appendChild(elList);
    elList.innerHTML=`<span id="proNam">${Items.all[i].name}</span> had <span id="proVot">${Items.all[i].votes}</span> vote/s, and was seen <span id="proSh">${Items.all[i].shown}</span> times.`;
  }
  proChart();
}


// eslint-disable-next-line no-redeclare
function compute(event){
  const table = document.createElement('ul');
  result.appendChild(table);
  for(let i=0; i<Items.all.length; i++){
    const elList = document.createElement('li');
    table.appendChild(elList);
    elList.textContent = `${Items.all[i].name} had ${Items.all[i].votes} vote/s, and was seen ${Items.all[i].shown} times.`;
  }
}
display();


function proChart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {

    type: 'bar',


    data: {
      labels: itemNames,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesChart
      },{
        label: 'Views',
        backgroundColor: '#0affd6',
        borderColor: '#0affd6',
        data: viewsChart
      }
      ]
    },

    options: {}
  });
}
