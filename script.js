// Get the parent element (ul) that contains the navbar items
let navBar = document.querySelector('.navigationLink');
console.log(navBar);

// Add a click event listener to the parent element
navBar.addEventListener('click', (event) => {
  if (event.target.classList.contains('navMenu')) {     // if (event.target.tagName === 'LI') {
    console.log(event.target.tagName);
    // Remove 'active' class from all navbar items
    let navBarItems = document.querySelectorAll('.navMenu');
    console.log(navBarItems);
    navBarItems.forEach((item) => {
      item.classList.remove('active');
    });

    // Add 'active' class to the clicked navbar item
    event.target.classList.add('active');

    let functionName = event.target.getAttribute('data-function');

    // Call the corresponding function based on the data-function attribute
    if (functionName && window[functionName] && typeof window[functionName] === 'function') {
      window[functionName]();
    }

  }
});



function atRandom() {
    console.log('Function 1 executed');
    // Your function 1 logic goes here
  }
  
  function byGenre() {
    console.log('Function 2 executed');
    // Your function 2 logic goes here
  }
  
function byAuthor() {
    console.log('Function 3 executed');
    // Your function 3 logic goes here
  }