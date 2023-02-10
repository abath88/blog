'use strict'

const links = document.querySelectorAll('.titles a')
function titleClickHandler(event){
    event.preventDefault();

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active')
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active')
    }

    /* [DONE] add class 'active' to the clicked link */
    const clickedElement = this
    clickedElement.classList.add('active')

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active')
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active')
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleId = clickedElement.getAttribute('href')

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const activeArticle = document.querySelector(articleId)

    /* [DONE] add class 'active' to the correct article */
    activeArticle.classList.add('active')
}

for(let link of links){
  link.addEventListener('click', titleClickHandler)
}