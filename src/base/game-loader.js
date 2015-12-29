// ASSET LOADING UTILITIES
//adapted from https://github.com/jakesgordon/javascript-tower-platformer/blob/master/js/common.js

import {addListener} from './dom-utils';

export function ImageLoader(names, callback) { // load multiple images and callback when ALL images have loaded
  let n,name,
      result = {},
      count  = names.length,
      onload = function() {
        if(--count == 0){
          callback(result);
        }
      };

  for(n = 0 ; n < names.length ; n++) {
    name = names[n];
    result[name] = document.createElement('img');
    addListener(result[name], 'load', onload);
    result[name].src = "images/" + name + ".png";
  }
};

export function JSONLoader (url, onsuccess) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == 200))
      onsuccess(JSON.parse(request.responseText));
  }
  request.open("GET", url + ".json", true);
  request.send();
}
