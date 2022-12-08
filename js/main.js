// Austin Hoelscher
// 11/26/2022
//Description: INF651 Final Project

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 1 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function createElemWithText(elem = "p", text = "", className) {
  const myElem = document.createElement(elem);
  myElem.textContent = text;
  if (className) {
    myElem.classList.add(className);
  }
  return myElem;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 2 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function createSelectOptions(jsonData) {
  if (!jsonData) {
    return undefined;
  }
  const options = [];
  options.length = jsonData.length;
  for (let i = 0; i < jsonData.length; i++) {
    options[i] = document.createElement("option");
    //options[i] = document.createAttribute("vlaue");
    //options[i] = document.createAttribute("textContent");
    options[i].value = jsonData[i].id;
    options[i].textContent = jsonData[i].name;
  }
  return options;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 3 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function toggleCommentSection(postId) {
  if (!postId) {
    return undefined;
  }
  // TODO: return null if paramenter does not match a post ID
  const sections = document.querySelectorAll("section") || undefined;
  let target;

  let exist = false;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].dataset.postId === `${postId}`) {
      exist = true;
      break;
    }
  }
  if (exist === false) {
    return null;
  }

  sections.forEach((element) => {
    if (element.dataset.postId === `${postId}`) {
      element.classList.toggle("hide");
      target = element;
    }
  });

  return target;
}

/*function toggleCommentSection(postId){
  if(!postId){
    return undefined;
  }
  let target;
  const section = document.querySelectorAll("section") || undefined;
  const exist = false;
  for(let i = 0; i < postId.length;i++){
    if(section[i].dataset.postId === postId){
      exist = true;
      target = section[i];
      break;
    }
  }
  if(exist === false){
    return null;
  }
  console.log(target);
  target.classList.toggle('hide');
  return target;
}*/
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 4 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function toggleCommentButton(postId) {
  if (!postId) {
    return;
  }
  // TODO: return null if paramenter does not match a post ID
  const buttons = document.querySelectorAll("button");
  let target;

  let exist = false;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.postId === `${postId}`) {
      exist = true;
      break;
    }
  }
  if (exist === false) {
    return null;
  }

  buttons.forEach((button) => {
    if (button.dataset.postId === `${postId}`) {
      target = button;
      if (button.textContent == "Show Comments") {
        button.textContent = "Hide Comments";
      } else {
        button.textContent = "Show Comments";
      }
    }
  });
  return target;
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 5 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function deleteChildElements(parentElement) {
  if (!parentElement?.tagName) {
    return undefined;
  }
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  return parentElement;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 6 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*function addButtonListeners() {
  const main = document.querySelector("main");
  const mainButtons = main.querySelectorAll("button");
  let selected = [];
  let postId;
  mainButtons.forEach((button) => {
    selected.push(button);
    postId = button.dataset.postId;
    button.addEventListener("click", function (e) {
      toggleComments(e, postId);
    });
  });
  return selected;
}*/
function addButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  if (buttons) {
    for (let i = 0; i < buttons.length; i++) {
      const id = buttons[i].dataset.postId;
      buttons[i].addEventListener(
        "click",
        (event) => {
          toggleComments(event, id);
        },
        false
      );
    }
  }
  return buttons;
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 7 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*function removeButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  /*for (let i = 0; i < mainButtons.length; i++) {
    selected.push(mainButtons[i]);
    postId = mainButtons[i].dataset.postId;
    main.Buttons[i].removeEventListener("click", toggleComments());
  }
  return selected;*/

/*mainButtons.forEach((button) => {
    selected.push(button);
    const id = button.dataset.id;
    buttons.removeEventListener("click", toggleComments(id), false);
  });
  return buttons;
}*/

function removeButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  if (buttons) {
    for (let i = 0; i < buttons.length; i++) {
      const postId = buttons[i].dataset.id;
      //console.log(buttons[i]);
      buttons[i].removeEventListener(
        "click",
        (event) => {
          toggleComments(event, postId);
        },
        false
      );
    }
  }
  return buttons;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 8 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function createComments(jsonData) {
  if (!jsonData) {
    return undefined;
  }
  const fragment = document.createDocumentFragment();
  jsonData.forEach((comment) => {
    const article = document.createElement("article");
    const h3 = createElemWithText("h3", comment.name);
    const p = createElemWithText("p", comment.body);
    const p2 = createElemWithText("p", `From: ${comment.email}`);
    article.append(h3, p, p2);
    fragment.append(article);
  });
  return fragment;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 9 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function populateSelectMenu(data) {
  if (!data) {
    return undefined;
  }
  const selectMenu = document.getElementById("selectMenu");
  const selectOptions = createSelectOptions(data);
  selectOptions.forEach((option) => {
    selectMenu.append(option);
  });
  return selectMenu;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 10 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonData = response.json();
    return jsonData;
  } catch {}
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 11 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function getUserPosts(userId) {
  if (!userId) {
    return undefined;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const jsonData = response.json();
    return jsonData;
  } catch {}
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 12 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function getUser(userId) {
  if (!userId) {
    return undefined;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const jsonData = response.json();
    return jsonData;
  } catch {}
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 13 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function getPostComments(postId) {
  if (!postId) {
    return undefined;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const jsonData = response.json();
    return jsonData;
  } catch {}
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 14 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function displayComments(postId) {
  if (!postId) {
    return undefined;
  }
  const fragment = document.createDocumentFragment();
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  fragment.append(createComments(comments));
  section.append(fragment);
  return section;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 15 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*async function createPosts(postsJSON) {
  if (!postsJSON) {
    return undefined;
  }
  const fragment = document.createDocumentFragment();
  postsJSON.forEach( async (post) => {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", post.title);
    //article.append(h2);
    const body = createElemWithText("p", post.body);
    //article.append(body);
    const postId = createElemWithText("p", `Post ID: ${post.id}`);
    //article.append(postId);
    const author = await getUser(post.userId);
    const company = createElemWithText(
      "p",
      `Author: ${author.name} with
    ${author.company.name}`
    );
    //article.append(company);
    const companyPhrase = createElemWithText(
      "p",
      `${author.company.catchPhrase}`
    ));
    //article.append(companyPhrase);
    const showComments = createElemWithText("button", "Show Comments");
    showComments.dataset.postId = post.id;
    //article.append(showComments);
    const section = await displayComments(post.id);
    article.append(
      h2,
      body,
      postId,
      company,
      companyPhrase,
      showComments,
      section
    );
    fragment.append(article);
    //console.log(article);
    console.log(fragment);
    //console.log(article);
    //return fragment;
  }
  console.log("this should be last");
  //console.log(fragment);
  return fragment;
}*/

async function createPosts(posts) {
  if (!posts) {
    return undefined;
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < posts.length; i++) {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", `${posts[i].title}`);
    const body = createElemWithText("p", `${posts[i].body}`);
    const postId = createElemWithText("p", `Post ID: ${posts[i].id}`);

    const author = await getUser(posts[i].userId);
    const authorP = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    const catchPhrase = createElemWithText(
      "p",
      `${author.company.catchPhrase}`
    );
    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = posts[i].id;
    const section = await displayComments(posts[i].id);
    article.append(h2, body, postId, authorP, catchPhrase, button, section);
    fragment.append(article);
    //console.log("this should be first");
  }

  //console.log(fragment);
  //console.log("this should be last");
  return fragment;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 16 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function displayPosts(posts) {
  const main = document.querySelector("main");
  //let element;
  if (!posts || posts === undefined) {
    const element = createElemWithText(
      "p",
      "Select an Employee to display their posts."
    );
    element.classList.add("default-text");
    main.append(element);
    //console.log(element);
    return element;
  }
  element = await createPosts(posts);
  main.append(element);
  //console.log(element);
  return element;
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 17 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function toggleComments(event, postId) {
  if (!event || !postId) {
    return undefined;
  }
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  return [section, button];
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 18 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function refreshPosts(data) {
  if (!data) {
    return undefined;
  }
  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(data);
  const addButtons = addButtonListeners();
  //selected = [removeButtons, main, fragment, addButtons];
  //console.log(selected.length);

  return [removeButtons, main, fragment, addButtons];
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 19 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function selectMenuChangeEventHandler(event) {
  if (!event) {
    return undefined;
  }
  const menu = document.getElementById("selectMenu");
  menu.disabled = true;
  const userId = event.target.value || 1;
  const posts = await getUserPosts(userId);
  const refreshPostsArray = await refreshPosts(posts);
  menu.disabled = false;
  return [userId, posts, refreshPostsArray];
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 20 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
async function initPage() {
  const users = await getUsers();
  const selectMenu = populateSelectMenu(users);
  return [users, selectMenu];
}
//////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTION 21 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function initApp() {
  initPage();
  const selectMenu = document.getElementById("selectMenu");
  selectMenu.addEventListener("change", (event) => {
    selectMenuChangeEventHandler(event);
  });
}
//Launch App

document.addEventListener("DOMContentLoaded", initApp());

/*document.addEventListener("DOMContentLoaded", (event) => {
  if (event.target.DOMContentLoaded === "complete") {
    initApp();
  }
});*/
