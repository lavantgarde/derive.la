
jQuery(document).ready(GetCurrentMood());

function GetCurrentMood() {
// get moods json
 var moods = new XMLHttpRequest();
 moods.open('GET', '/moods/moods.json');
 moods.responseType = 'json';
 moods.send();
// get current mood json 
 moods.onload = function() {
 var currentMood = moods.response;
  document.getElementById("current").innerHTML = "current mood: " + currentMood.current_mood;

 var currentMoodJSON =  new XMLHttpRequest();
 currentMoodJSON.open('GET', '/moods/' + currentMood.current_mood + '.json');
 currentMoodJSON.responseType = 'json';
 currentMoodJSON.send();
// insert content from json
 currentMoodJSON.onload = function() {
 var json = currentMoodJSON.response;

 ParseAndInsertFromMood(json); 
  var myLazyLoad = new LazyLoad();
    } 
  }
}

function ParseAndInsertFromMood(json) {
const container = $('#container');
json.forEach(row => { 
  container.append(`<div class="grid"></div>`) 
  const el = $('div.grid:last')
row.forEach(cell => {
  el.append(`
  <div class="grid-cell" height="960px">
  <div class="img_"><a href="${cell.img_link}" height="960px">
  <img class="lazyload" data-src="${cell.img_src}" height="960px"/></a>
  </div>
  </div> `)  })  })
}
// todo: implement
function GetRandomMood() {
// get random json file 
 var moods = new XMLHttpRequest();
 moods.open('GET', '/moods/moods.json');
 moods.responseType = 'json';
 moods.send();
// get contents of active json file
 moods.onload = function() {
 var moodsResponse = moods.response;
 var moodList = moodsResponse.past_moods.split(',');
 var rMood = moodList[Math.floor(Math.random() * moodList.length)];
 var current_Mood = document.getElementById("current").innerHTML;
  if (current_Mood == "current mood: " + rMood)
    { return; }
   document.getElementById("current").innerHTML = "current mood: " + rMood;


 var randomMood = new XMLHttpRequest();
 
 randomMood.open('GET', '/moods/' + rMood + '.json');
 randomMood.responseType = 'json';
 randomMood.send();

// insert json content
 randomMood.onload = function() {
 var json = randomMood.response;

    document.getElementById("container").innerHTML = "";
    
 ParseAndInsertFromMood(json); 
  var myLazyLoad = new LazyLoad();
    } 
  }
}

