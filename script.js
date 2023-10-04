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
        <h2>Showing ${sentences.length} ${word}</h2>
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
    // const generateNo = document.getElementById("authorNo");
    // const authorSelect = document.getElementById("authorSelect");

    let generateNoValue = parseInt(generateNo.value)
    let getAuthorValue = authorSelect.value
    // console.log(generateNoValue);


    fetch(`${url}?count=10&author=${getAuthorValue}`)        
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        
        let word
        let sentencesExtracted = [];
        let authors = [] 

      
        data.data.forEach(item => {
            sentencesExtracted.push(item.quoteText);
            authors.push(item.quoteAuthor);
        });

            //Convert the array to a Set to remove duplicates
        const uniqueSentences = new  Set(sentencesExtracted);
            //Converts the Set back to an Array
            const sentences = Array.from(uniqueSentences)

            // console.log(sentences);
        if(generateNoValue < 2) {
            word = 'Quote'
        } else{
            word = 'Quotes'
        }
        fetchInfo.innerHTML = `
        <h2>Showing ${Math.min(generateNoValue, sentences.length)} ${word}</h2>
        `

        // console.log(sentences);

        fetchInfo.style.display = 'flex'
        ResultEl.style.display = ''
        ResultEl.innerHTML = ''
        for (let j = 0; j < Math.min(generateNoValue, sentences.length); j++) {
            ResultEl.innerHTML += `
            <div class="quotes">
            <div class="quoteContent">
                <h4>${sentences[j]}</h4>
            <p>-${authors[j]}</p>
            </div>
        </div>
            `
        }
    }).catch(() => {
        fetchInfo.innerHTML = `
              <h2 class="error">Oops😞!         <br>
              Could not Generate Quote.</h2>
          `;
          fetchInfo.style.display = 'flex'
      });
}


// *****************************************************************
$(document).ready(function() {
    $('#genreSelect').select2({width: '140px'});
});


$(document).ready(function() {
    const authorSelect = $('#authorSelect');
    authorSelect.select2({width: '200px'});

    authorSelect.on('change', fetchTotalQuotes);
});


function fetchTotalQuotes() {
    if (typeof $ !== 'undefined' && $.fn.select2 && $(this).data('select2')) {
        // Use Select2 value
        getAuthorValue = $(this).val();
    } else {
        // Use standard input value
        getAuthorValue = authorSelect.value;
    }

    fetch(`https://quote-garden.onrender.com/api/v3/quotes?author=${getAuthorValue}`)
    .then((response) => response.json())
    .then((data) => {
        let sentencesExtracted = []; 
      
        data.data.forEach(item => {
            sentencesExtracted.push(item.quoteText);
        });

                //Convert the array to a Set to remove duplicates
        const uniqueSentences = new  Set(sentencesExtracted);
                //Converts the Set back to an Array
        const sentences = Array.from(uniqueSentences)

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
    })
}