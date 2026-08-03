/* =============================================================================
 * EECE/CS 3093C Software Engineering - Lab 4
 * client.js - code skeleton provided by Dr. Phu Phung in Lab 1
 * Code complete implementation by Zachary Windisch
 * ===============================================================================
 */

// UI DOM references
var searchButtonElement = document.getElementById('search-button');
if(!searchButtonElement) {
    console.log("Error in getting 'send-button' button");
}
searchButtonElement.addEventListener('click', ()=>{
    search();
    searchInput.value = ''; // clears the field after an explicit Enter search
});

var searchInput = document.getElementById('search-input');
if(!searchInput) {
    console.log('Error in getting "search-input" input');
}

searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    search();
    searchInput.value = ''; // clears the field after an explicit Enter search
  }
});

const BASE_URL = "https://uscities-microservices-x6il.onrender.com";
async function search() {
    const query = searchInput.value.trim();
    if (!query) return; // AC9: empty/whitespace-only queries never reach fetch()
    console.log(`Debug>query: ${query}`);
    try {
        const response = await fetch(`${BASE_URL}/uscities-search/${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Unexepected status ${response.status}`); // AC4 / AC11: fail safely, not open
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Malformed response'); // AC10: validate shape before display
        }
        displaySearch(data);
    } catch (err) {
        console.log(`Debug> search error: ${err.message}`);
        document.getElementById('responses').textContent = 'Error: could not load results.'; // AC4 / AC11
    }
}

var responsesElm = document.getElementById('responses');
function displaySearch(data) {
    // To do
    if (!responsesElm) {
        console.log('Error in getting "responses"');
        return;
    }
    // AC1 / AC2: matches found - this version only shows the raw JSON text
    // AC3: no matches - explicit message instead of a blank / empty display
    // textContent for now
    responsesElm.innerHTML = jsonToHtmlTable(data);
}

// AC9 / AC10: sanitize every field before it is rendered as HTML
function data_sanitize(v) {
    return DOMPurify.sanitize(typeof v === 'string' ? v : '');
}
function jsonToHtmlTable(data) {
    if (!Array.isArray(data) || data.length === 0) return "No cities found"; // AC10 / AC11
    var items = data.map(function (c) {
        return '<li class="city-card"><strong>' + data_sanitize(c.city) + "</strong>, " + data_sanitize(c.state_name) +
               ' <span class="zips">' + data_sanitize(c.zips) + "</span></li>";
    }).join('');
    return '<ul class="city-list">' + items + '</ul>';
}