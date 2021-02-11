// Start server: python3 -m http.server 1234 --bind 127.0.0.1
// http://127.0.0.1:1234/
// Ctrl+F5 when refreshing the browser


// const rp = require('request-promise');
// const $ = require('cheerio');
// const url = 'https://www.pro-football-reference.com/players/T/ThomMi05/gamelog/';
const heroku = "https://cors-anywhere.herokuapp.com/"



// Start the worker in which sql.js will run
// var worker = new Worker("https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.4.0/dist/sql-wasm.js");
// var worker = new Worker("sql-wasm.js");
var worker = new Worker (heroku + "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.4.0/dist/worker.sql-wasm.js");
worker.onerror = error;

// Open a database
// worker.postMessage({ action: 'open' });

// Connect to the HTML element we 'print' to
function print(text) {
	outputElm.innerHTML = text.replace(/\n/g, '<br>');
}
function error(e) {
	console.log(e);
	errorElm.style.height = '2em';
	errorElm.textContent = e.message;
}


const search_url = "https://www.pro-football-reference.com/search/search.fcgi?hint=Michael+Thomas&search=Michael+Thomas"

let g_html = "";
let search_url_start = "https://www.pro-football-reference.com/search/search.fcgi?search="

function find_players()
{
  console.log("submit pressed");
  var nameValue = document.getElementById("first").value;
  var teamValue = document.getElementById("first_team").value;
  var lastNameValue = document.getElementById("last").value;
  console.log(nameValue);
  console.log(teamValue);

  let full_search_url = search_url_start + nameValue + "+" + lastNameValue;
  console.log(full_search_url);

  // Cors: https://cors-anywhere.herokuapp.com/
  $(document).ready(function() 
  {
    $.get(heroku + full_search_url, function(data, status)
    {
      // console.log("Data: " + data + "\nStatus: " + status);
      console.log(status);
      // console.log(data);

      // I need to add a check to see if I am on the search results page


      
      // I need to do a toupper on first letter
      const nameCapitalized = teamValue.charAt(0).toUpperCase() + teamValue.slice(1);
      console.log(nameCapitalized);
      let arr = [];
      $( 'em:contains("' + nameCapitalized + '")', data ).each(function( index ) {
        arr.push($(this));
      });
      // I might need to add some more filtering here
      // This gets the correct linkage
      console.log(arr[0].parent().parent().find("a").attr("href"));

      // This gives /players/T/ThomMi05.htm
      let player_link = arr[0].parent().parent().find("a").attr("href");
      go_to_gamelog(player_link);
    });
  });
}

// let query = 'th:contains("Career")';
function get_stats()
{
  // FInd table row that says career
  let query = 'tfoot > tr > th:contains("Career")';
  let res = $(query, g_html);
  console.log(res.text());

  // get the parent element
  // let dad = res.parent();
  // console.log(dad.attr('data-row'));

  // get all stats from the row
  let games_query = 'tfoot:first tr:first td[data-stat="g"]';
  res = $(games_query, g_html);
  console.log(res.text());

  // qb-rec
  let qb_rec_query = 'tfoot:first tr:first td[data-stat="qb_rec"]';
  res = $(qb_rec_query, g_html);
  console.log(res.text());

}

// https://www.pro-football-reference.com/players/B/BradTo00.htm
function find_players2()
{
  // grab vals in fields
  console.log("submit pressed");
  var nameValue = document.getElementById("first").value;
  var teamValue = document.getElementById("teams").value;
  var lastNameValue = document.getElementById("last").value;
  console.log(nameValue);
  console.log(lastNameValue);
  console.log(teamValue);

  // Slice up strings
  let last_name_letter = lastNameValue[0]
  let last_name_4_letters = lastNameValue.slice(0, 4);
  let first_name_2_letters = nameValue.slice(0, 2);
  console.log(first_name_2_letters);
  console.log(last_name_4_letters);
  console.log(last_name_letter);

  // Create URL
  let player_iter = 0;
  let lock = 0;
  
  // TODO: loop is really bad
  // Find way to check other numbers
  let player_url = "www.pro-football-reference.com/players/" + last_name_letter + "/" + last_name_4_letters + 
  first_name_2_letters + "0" + player_iter.toString() + ".htm";

  // returns html of the page
  lock = 1;
  $.get(heroku + player_url, function(data, status)
  {
    // finds the element that contains the team name
    g_html = data;
    let query = 'a:contains(' + '"' + teamValue + '"' + ')';
    console.log(player_iter);
    console.log(player_url);
    console.log(query);
    
    // queries the data (html) and prints the text value 
    let val = $(query, data);
    console.log(val.text());
    if (val.text() === teamValue)
    {
      console.log('Found team value');
      player_iter = 100;
      get_stats();
    }
    lock = 0;
  });

  
 

  // Test 00 and so forth






}

function go_to_gamelog(player_link)
{
  var site = "https://www.pro-football-reference.com" + player_link + "/gamelog";
  console.log("Site = " + site);
  $(document).ready(function() 
  {
    $.get(heroku + site, function(data, status)
    {
      console.log(data);
    });
  });
}

function find_opponent(opp)
{
  // Loops over the elements w/HTML that contains NYG and stores in an array
  let arr = [];
  $( 'a:contains("NYG")', html ).each(function( index ) {
    arr.push($(this));
  });
  console.log("here");
  console.log(arr[1].parent().parent().attr('id'));
  console.log(arr.length);
}


function get_yards()
{

}

$(document).ready(function() {
  // all custom jQuery will go here
  console.log("queeryt");
});

/*
// I can probably contain this get in a function, too
let global = 0;
rp(url)
  .then(function(html){
    // This does work
    // global = html;
    // console.log(global);

    // success!
    // console.log(html);
    // console.log($('#stats.1').length);
    // console.log($('#stats.1'));

    // gets all the stats (if you get rid of first)
    let stats_row = $('tr > td', html);
    console.log(stats_row.first().text());

    let stat = $('td[data-stat="opp"]', html);
    console.log(stat.first().text());

    // finds a elements that contain NYG
    let opp = $('a:contains("NYG")', html);
    console.log(opp.text());

    // Loops over the elements w/HTML that contains NYG and stores in an array
    let arr = [];
    $( 'a:contains("NYG")', html ).each(function( index ) {
      arr.push($(this));
    });
    console.log("here");
    console.log(arr[1].parent().parent().attr('id'));
    console.log(arr.length);
    // xpath to yards: //*[@id="stats.2"]/td[13]

    // get yards
    let yards = arr[1].parent().parent().attr('id').toString();
    console.log(yards)
    let pos = yards.indexOf('.');
    console.log(pos);
    yards = yards.slice(0, pos) + "\\" + yards.slice(pos);
    console.log(yards);
    yards = '#' + yards + " [data-stat='rec_yds']";
    console.log(yards);
    let row1 = $(yards, html);
    console.log(row1.text());


    // Get all a elems inside td
    a_elem = $('td > a', html);
    // console.log(a_elem.text());


    // Gets ID of the stat
    console.log(opp.parent().parent().attr('id'));


    // I have to escape the .
    let row = $("#stats\\.1 [data-stat='year_id']", html);
    console.log(row.text());
  })
  .catch(function(err){
    // handle error
  });
  */



  // $.get("https://www.pro-football-reference.com/players/T/ThomMi05/gamelog/", function(data, status){
  //   console.log("Data: " + data + "\nStatus: " + status);
  // });


