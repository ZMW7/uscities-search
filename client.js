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
    if (!query || query.length === 0) return; // AC9: empty/whitespace-only queries never reach fetch()
    console.log(`Debug>query: ${query}`);
}

var responsesElm = document.getElementById('responses');
function displaySearch(data) {
    // To do
}
