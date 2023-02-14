'use strict';

function generateTitleLinks(customSelector = ''){
  /* [DONE] delete all links in left column */
  const linksList = document.querySelector('.list.titles');
  linksList.innerHTML = '';
  const articles = document.querySelectorAll(`.post${customSelector}`);
  console.log(`.post${customSelector}`);

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

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = newTagsList;

  /* [DONE] END LOOP: for every article: */
  }
}

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('-')[1];

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll(`a.active[href^="#tag-"]`);

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* [DONE] remove class active */
    activeTag.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksWithHref = document.querySelectorAll(`a[href="${href}"]`);

  /* [DONE] START LOOP: for each found tag link */
  for(let tagLinkWithHref of tagLinksWithHref){

    /* [DONE] add class active */
    tagLinkWithHref.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for(let tagLink of tagsLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

function generateAuthors() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll('.post');
  
  /* [DONE] START LOOP: for every article: */
  for(let article of articles) {
    /* [DONE] find author wrapper */
    const postAuthor = article.querySelector('.post-author');

    /* [DONE] make html variable with empty string */
    postAuthor.innerHTML = '';

    /* [DONE] get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /* [DONE] create author href */
    const authorHref = author.replace(' ', '-');

    /* [DONE] insert HTML with the link */
    postAuthor.innerHTML = `by <a href="#author-${authorHref}">${author}</a>`;
  }
}

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '').replace('-', ' ');
  

  /* [DONE] find all tag links with class active */
  const activeAuthors = document.querySelectorAll(`a.active[href^="#author-"]`);

  /* [DONE] START LOOP: for each active tag link */
  for(let activeAuthor of activeAuthors){

    /* [DONE] remove class active */
    activeAuthor.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksWithHref = document.querySelectorAll(`a[href="${href}"]`);

  /* [DONE] START LOOP: for each found tag link */
  for(let authorLinkWithHref of authorLinksWithHref){

    /* [DONE] add class active */
    authorLinkWithHref.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }
  
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors(){
  /* [DONE] find all links to authors */
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  /* [DONE] START LOOP: for each link */
  for(let authorLink of authorsLinks) {

    /* [DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

generateTags();
generateAuthors();
generateTitleLinks();
addClickListenersToTags();
addClickListenersToAuthors();