const url = `https://quote-garden.onrender.com/api/v3/quotes/random`;
let navBar = document.querySelector(".navigationLink");

const byRandomDiv = document.getElementById('byRandomDiv');
const byAuthorDiv = document.getElementById('byAuthorDiv');
const byGenreDiv = document.getElementById('byGenreDiv');
const fetchInfo = document.getElementById('fetchInfo')
// console.log(navBar);
const ResultEl = document.querySelector(".result");
const generateBtn = document.querySelector(".generateBtn");
// console.log(fetchInfo);
const authorSelect = document.getElementById("authorSelect");
const generateNo = document.getElementById("authorNo");
let getAuthorValue

fetchInfo.style.display = 'none'
ResultEl.style.display = 'none'


const getGenres = () => {
    const apiUrl = 'https://quote-garden.onrender.com/api/v3/genres';
    const genres = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.data)

    return genres
}

const getAuthors = () => {
    const apiUrl = 'https://quote-garden.onrender.com/api/v3/authors';
    const authors = fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.data)
    return authors
}

const appendOptionsElToSelectEl = (optionItem, selectEl) => {
    const optionEl = document.createElement("option"); //create <option> element on html
    optionEl.value = optionItem  //The value of the option
    optionEl.textContent = optionItem //The displayed description of the option. That will be shown
    selectEl.appendChild(optionEl)
}

const populateSelectEl = (selectEl, optionItems) => {
    optionItems.forEach((optionItem) => appendOptionsElToSelectEl(optionItem, selectEl))
}

const setUpAuthorsAndGenres = async () => {
    const genreSelect = document.getElementById('genreSelect')
    const authorSelect = document.getElementById('authorSelect')

    const genresList = await getGenres()
    const authorsList = await getAuthors()
    authorsList.shift()
    // console.log(authorsList);
    // console.log(genresList);

    populateSelectEl(genreSelect, genresList)
    populateSelectEl(authorSelect, authorsList)
    fetchTotalQuotes();
}
setUpAuthorsAndGenres()


generateBtn.addEventListener("click", () => {
    const activeNavMenu = document.querySelector(".active");
    const functionName = activeNavMenu.getAttribute("data-function");
  
    if (functionName && window[functionName] && typeof window[functionName] === "function") {
      window[functionName]();
    }
  });


// Add a click event listener to the parent element
navBar.addEventListener("click", (event) => {
  if (event.target.classList.contains("navMenu")) {             // if (event.target.tagName === 'LI') {
    // console.log(event.target.tagName);

    // Remove 'active' class from all navbar items
    let navBarItems = document.querySelectorAll(".navMenu");
    // console.log(navBarItems);
    navBarItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add 'active' class to the clicked navbar item
    event.target.classList.add("active");
    
    const activeNavMenu = document.querySelector(".active");
    const selectedFunction = activeNavMenu.getAttribute('data-function');

    byRandomDiv.style.display = (selectedFunction === 'atRandom') ? 'flex' : 'none';
    byAuthorDiv.style.display = (selectedFunction === 'byAuthor') ? 'flex' : 'none';
    byGenreDiv.style.display = (selectedFunction === 'byGenre') ? 'flex' : 'none';
    ResultEl.innerHTML = '';
    fetchInfo.style.display = 'none';
}
});

function atRandom() {
  const generateNo = document.getElementById("randomNo");

        let generateNoValue = parseInt(generateNo.value);
        // console.log(generateNoValue);

        fetch(`${url}?count=${generateNoValue}`)        
        .then((response) => response.json())
        .then((data) => {
            let word 

            if(generateNoValue < 2) {
                word = 'Quote'
            } else{
                word = 'Quotes'
            }

            fetchInfo.innerHTML = `
            <h2>Showing ${generateNoValue} ${word}</h2>
            `

            let sentences = [];
            let authors = [];

            
            data.data.forEach(item => {
                sentences.push(item.quoteText);
                authors.push(item.quoteAuthor);
            });
            // console.log(sentences);

            fetchInfo.style.display = 'flex';
            ResultEl.style.display = '';
            ResultEl.innerHTML = '';
            for (let j = 0; j < sentences.length; j++) {
                ResultEl.innerHTML += `
                <div class="quotes">
                <div class="quoteContent">
                    <h4>${sentences[j]}</h4>
                <p>-${authors[j]}</p>
                </div>
            </div>
                `
            }
    })
    .catch(() => {
        fetchInfo.innerHTML = `
              <h2 class="error">Oops😞!         <br>
              Could not Generate Quote.</h2>
          `;
          fetchInfo.style.display = 'flex'
    });
}

function byGenre() {
    const generateNo = document.getElementById("genreNo");
    const genreSelect = document.getElementById("genreSelect");

    let generateNoValue = parseInt(generateNo.value)
    let getGenreValue = genreSelect.value
    const genreCapitalize = getGenreValue.charAt(0).toUpperCase() + getGenreValue.slice(1)
    // console.log(generateNoValue);
    
    fetch(`${url}?count=${generateNoValue}&genre=${getGenreValue}`)        
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let word 
        let sentences = [];
        let authors = []
        
        data.data.forEach(item => {
            sentences.push(item.quoteText);
            authors.push(item.quoteAuthor);
        });
        // console.log(sentences);

        if(sentences.length < 2) {
            word = 'Quote'
        } else{
            word = 'Quotes'
        }

        fetchInfo.innerHTML = `
        <h2>Showing ${sentences.length} ${genreCapitalize} ${word}</h2>
        `

        fetchInfo.style.display = 'flex'
        ResultEl.style.display = ''
        ResultEl.innerHTML = ''
        for (let j = 0; j < sentences.length; j++) {
            ResultEl.innerHTML += `
            <div class="quotes">
            <div class="quoteContent">
                <h4>${sentences[j]}</h4>
            <p>-${authors[j]}</p>
            </div>
        </div>
            `
        }
    })
    .catch(() => {
        fetchInfo.innerHTML = `
            <h2 class="error">Oops😞!         <br>
            Could not Generate Quote.</h2>
        `;
        fetchInfo.style.display = 'flex'
    });
}

function byAuthor() {
    // Get the value of the "authorNo" select element
    let generateNoValue = parseInt(generateNo.value);
    
    // Get the value of the "authorSelect" select element
    let getAuthorValue = authorSelect.value;

    fetch(`${url}?count=10&author=${getAuthorValue}`)
    .then((response) => response.json())
    .then((data) => {
        let word;
        let sentencesExtracted = [];
        let authors = [];

        // Extract the quoteText and quoteAuthor properties from each item in the data array
        data.data.forEach(item => {
            sentencesExtracted.push(item.quoteText);
            authors.push(item.quoteAuthor);
        });

        // Convert the array to a Set to remove duplicates
        const uniqueSentences = new Set(sentencesExtracted);
        // Convert the Set back to an Array
        const sentences = Array.from(uniqueSentences);

        // Determine the word to use based on the generateNoValue
        if(generateNoValue < 2) {
            word = 'Quote';
        } else {
            word = 'Quotes';
        }

        // Update the fetchInfo element to display the number of quotes and the author
        fetchInfo.innerHTML = `
        <h2>Showing ${Math.min(generateNoValue, sentences.length)} ${word} by ${getAuthorValue}</h2>
        `;

        fetchInfo.style.display = 'flex';
        ResultEl.style.display = '';
        ResultEl.innerHTML = '';

        // Display the quotes and their authors
        for (let j = 0; j < Math.min(generateNoValue, sentences.length); j++) {
            ResultEl.innerHTML += `
            <div class="quotes">
                <div class="quoteContent">
                    <h4>${sentences[j]}</h4>
                    <p>-${authors[j]}</p>
                </div>
            </div>
            `;
        }
    }).catch(() => {
        // Display an error message if the quotes could not be generated
        fetchInfo.innerHTML = `
            <h2 class="error">Oops😞!<br>
            Could not Generate Quote.</h2>
        `;
        fetchInfo.style.display = 'flex';
    });
}


// *****************************************************************
$(document).ready(function() {
    $('#genreSelect').select2({width: '140px'});
});
// Initializes the select element with the ID "genreSelect" using the Select2 library and sets its width to 140px.

$(document).ready(function() {
    const authorSelect = $('#authorSelect');
    authorSelect.select2({width: '200px'});
    authorSelect.on('change', fetchTotalQuotes);
});
// Initializes the select element with the ID "authorSelect" using the Select2 library and sets its width to 200px.
// Adds a change event listener to the "authorSelect" element, which calls the "fetchTotalQuotes" function when the selection changes.

function fetchTotalQuotes() {
    if (typeof $ !== 'undefined' && $.fn.select2 && $(this).data('select2')) {
        // Use Select2 value
        getAuthorValue = $(this).val();
    } else {
        // Use standard input value
        getAuthorValue = authorSelect.value;
    }
    // Checks if Select2 is available and if the current element has a Select2 instance.
    // If true, assigns the selected value from Select2 to "getAuthorValue".
    // If false, falls back to using the standard input value from the "authorSelect" element.

    fetch(`https://quote-garden.onrender.com/api/v3/quotes?author=${getAuthorValue}`)
    .then((response) => response.json())
    .then((data) => {
        let sentencesExtracted = []; 
        data.data.forEach(item => {
            sentencesExtracted.push(item.quoteText);
        });
        // Extracts the quoteText property from each item in the data array and adds it to the "sentencesExtracted" array.

        // Convert the array to a Set to remove duplicates
        const uniqueSentences = new Set(sentencesExtracted);
        // Converts the Set back to an Array
        const sentences = Array.from(uniqueSentences);
        // Removes duplicates from the "sentencesExtracted" array by converting it to a Set and then back to an array.

        let totalQuotes = sentences.length;
        let maxQuotes = Math.min(totalQuotes, 10); // Limit to a maximum of 10 quotes

        // Update the options in the authorNo select element based on totalQuotes
        generateNo.innerHTML = ''; // Clear existing options
        for (let i = 1; i <= maxQuotes; i++) {
            const optionEl = document.createElement("option");
            optionEl.value = i;
            optionEl.textContent = i;
            generateNo.appendChild(optionEl);
        }
        // Updates the options in the "generateNo" select element based on the total number of quotes.
        // Clears any existing options and adds new options representing numbers from 1 to the maximum number of quotes.
    });
}