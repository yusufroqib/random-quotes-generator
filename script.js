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
  }
});


