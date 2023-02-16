'use strict';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.list.authors';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function calculateTagsParams(tags) {
  const values = Object.values(tags);

  return {
    min: values.length ? Math.min(...values) : 9999,
    max: values.length ? Math.max(...values) : 1,
  };
}

function generateTitleLinks(customSelector = ''){
  const linksList = document.querySelector('.list.titles');
  linksList.innerHTML = '';
  const articles = document.querySelectorAll(`.post${customSelector}`);

  for(let article of articles) {
    const articleTitle = article.querySelector('.post-title');
    const linkHTMLData = {id: article.getAttribute('id'), title: articleTitle.textContent};
    const linkHTML = templates.articleLink(linkHTMLData);
    linksList.innerHTML += linkHTML;
  }

  linksList.onclick = function(event) {
    event.preventDefault();
    let target = event.target;
    if(target.tagName === 'SPAN') titleClickHandler(target.tagName == 'A' ? target : target.parentElement);
  };
}

function titleClickHandler(clickedElement){
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleId = clickedElement.getAttribute('href');
  const activeArticle = document.querySelector(articleId);

  activeArticle.classList.add('active');
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll('.post');
  
  for(let article of articles) {
    const tagsList = article.querySelector('.list');
    tagsList.innerHTML = '';
    const tags = article.getAttribute('data-tags');
    const tagsArray = tags.split(' ');
    let newTagsList = '';

    for(let tag of tagsArray){
      const linkHTMLData = {tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      newTagsList += linkHTML;

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsList.innerHTML = newTagsList;
  }

  const tagList = document.querySelector(optTagsListSelector);

  const allTagsData = {
    tags: []
  };

  for(let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: `${optCloudClassPrefix}${calculateTagClass(allTags[tag], calculateTagsParams(allTags))}`
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.split('-')[1];
  const activeTags = document.querySelectorAll(`a.active[href^="#tag-"]`);

  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  const tagLinksWithHref = document.querySelectorAll(`a[href="${href}"]`);
  for(let tagLinkWithHref of tagLinksWithHref){
    tagLinkWithHref.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags(){
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  for(let tagLink of tagsLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll('.post');
  let allAuthors = {};
  for(let article of articles) {
    const postAuthor = article.querySelector('.post-author');
    postAuthor.innerHTML = '';
    const author = article.getAttribute('data-author');
    const linkHTMLData = { authorHref: author.replace(' ', '-'), author };
    postAuthor.innerHTML = templates.authorLink(linkHTMLData);

    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = {
    authors: []
  }

  for(let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      href:author.replace(' ', '-')
    })
  }
  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '').replace('-', ' ');
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors(){
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  for(let authorLink of authorsLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateTags();
generateAuthors();
generateTitleLinks();
addClickListenersToTags();
addClickListenersToAuthors();