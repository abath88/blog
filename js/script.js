'use strict'

function titleClickHandler(event){
  console.log('Link was clicked!')
  console.log(event)
}

const links = document.querySelectorAll('.titles a')

for(let link of links){
  link.addEventListener('click', titleClickHandler)
}