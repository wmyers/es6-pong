// SIMPLE DOM UTILITIES
// adapted from https://github.com/jakesgordon/javascript-tower-platformer/blob/master/js/common.js

//id selectors
export function getElementById (id) {
  return ((id instanceof HTMLElement) || (id === document)) ? id: document.getElementById(id);
};

export function setElementById (id, html) {
  getElementById(id).innerHTML = html;
};

//adding event handlers
export function addListener (ele, type, fn, capture) {
  getElementById(ele).addEventListener(type, fn, capture);
};

export function removeListener (ele, type, fn, capture) {
  getElementById(ele).removeEventListener(type, fn, capture);
};

//showing and hiding elements
export function showElement (ele, type) {
  getElementById(ele).style.display = (type || 'block');
};

export function hideElement (ele) {
  ele.style.display = 'none';
};

//adding and removing classnames
export function hasClassName (ele, name) {
  return (new RegExp("(^|\s*)" + name + "(\s*|$)")).test(ele.className);
};

export function toggleClassName (ele, name, on) {
  let classes = ele.className.split(' ');
  let n = classes.indexOf(name);
  on = (typeof on === 'undefined') ? (n < 0) : on;
  if (on && (n < 0)) {
    classes.push(name);
  } else if (!on && (n >= 0)) {
    classes.splice(n, 1);
  }
  ele.className = classes.join(' ');
};

export function addClassName (ele, name) {
  toggleClassName(ele, name, true);
};

export function removeClassName (ele, name) {
  toggleClassName(ele, name, false);
};

//Get DOM Elements By Selector
export function querySelector (selector, context) {
  return (context || document).querySelectorAll(selector);
};
