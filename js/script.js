'use strict'

/* [DONE] delete all links in left column */
document.querySelector('.list.titles').innerHTML = ''
const articles = document.querySelectorAll('.post')

/* [DONE] for every article */
for(let article of articles) {
    /* [DONE] find elements with title */
    const articleTitle = article.querySelector('.post-title')

    /* [DONE] create html code with link */
    const link = '<li><a href="#' + article.getAttribute('id') + '"><span>' + articleTitle.textContent + '</span></a></li>'

    /* [DONE] insert html with link to link list */
    document.querySelector('.list.titles').innerHTML += link
}
  
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