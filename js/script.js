'use strict';

function generateTitleLinks(){
  /* [DONE] delete all links in left column */
  const linksList = document.querySelector('.list.titles');
  linksList.innerHTML = '';
  const articles = document.querySelectorAll('.post');

  /* [DONE] for every article */
  for(let article of articles) {
    /* [DONE] find elements with title */
    const articleTitle = article.querySelector('.post-title');

    /* [DONE] create html code with link */
    const link = `<li><a href="#${article.getAttribute('id')}"><span>${articleTitle.textContent}</span></a></li>`;

    /* [DONE] insert html with link to link list */
    linksList.innerHTML += link;
  }

  linksList.onclick = function(event) {
    event.preventDefault();
    let target = event.target;
    if(target.tagName == 'UL' || target.tagName == 'LI') return;
    titleClickHandler(target.tagName == 'A' ? target : target.parentElement);
  };
}

function titleClickHandler(clickedElement){
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleId = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const activeArticle = document.querySelector(articleId);

  /* [DONE] add class 'active' to the correct article */
  activeArticle.classList.add('active');
}

generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll('.post');
  
  /* [DONE] START LOOP: for every article: */
  for(let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector('.list');

    /* [DONE] make html variable with empty string */
    tagsList.innerHTML = '';

    /* [DONE] get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const tagsArray = tags.split(' ');
    let newTagsList = '';

    /* [DONE] START LOOP: for each tag */
    for(let tag of tagsArray){
      /* [DONE] generate HTML of the link */
      const link = `<li><a href="#tag-${tag}">${tag}</a></li>\n`;
      /* [DONE] add generated code to html variable */
      newTagsList += link;
      
    /* [DONE] END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = newTagsList;

  /* END LOOP: for every article: */
  }
}

generateTags();
