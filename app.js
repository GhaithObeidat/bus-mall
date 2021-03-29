'use strict';

let leftIndex;
let midIndex;
let rightIndex;
let numRounds = 0;
let results;

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

  leftIndex = randomNumb(Items.all.length-1, 0);
  leftImage.src = Items.all[leftIndex].path;
  leftImage.alt = Items.all[leftIndex].name;
  leftImage.title = Items.all[leftIndex].name;
  Items.all[leftIndex].shown +=1;
  do{
    midIndex = randomNumb(Items.all.length-1, 0);
    midImage.src = Items.all[midIndex].path;
    midImage.alt = Items.all[midIndex].name;
    midImage.title = Items.all[midIndex].name;
  }while(midIndex === leftIndex);
  Items.all[midIndex].shown +=1;
  do{
    rightIndex = randomNumb(Items.all.length-1, 0);
    rightImage.src = Items.all[rightIndex].path;
    rightImage.alt = Items.all[rightIndex].name;
    rightImage.title = Items.all[rightIndex].name;
  }while(rightIndex === leftIndex || rightIndex===midIndex);
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
    display();
    numRounds +=1;
    if (numRounds === 25) {
      results = document.createElement('button');
      result.appendChild(results);
      results.textContent='Results !';

      results.addEventListener('click', compute);
    }
  }
}

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
