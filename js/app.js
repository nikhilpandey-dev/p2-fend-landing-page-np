/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const menuListUL = document.getElementById('navbar__list');
const a__class = 'menu__link';
const li__class = 'navbar__list__item';
const active_class = 'active';
const threshold_options_obj = {
    root: null,
    rootMargin: '-50px 0px 0px 0px',
    threshold: 0.6
}

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createNav() {

    const docFragment = document.createDocumentFragment();
    for (const section of sections) {
        const id = section.id;
        const li = document.createElement('li');
        li.classList.add(li__class, id);
        const aElement = document.createElement('a');
        aElement.classList.add(a__class);
        // aElement.href = `#${id}`;
        aElement.innerText = section.getAttribute('data-nav');
        li.appendChild(aElement);
        scrollToLink(aElement, section);
        docFragment.appendChild(li);
    }
    menuListUL.appendChild(docFragment);
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createNav();

// Add class 'active' to section when near top of viewport


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
// Scroll to anchor ID using scrollTO event

function scrollToLink(clickElement, scrollElement) {
    clickElement.addEventListener('click', function(event) {
        event.preventDefault();
        scrollElement.scrollIntoView({
            behavior: 'smooth'
        });

    });
}


// Set sections as active

const callbackFunction = function(entries) {
    console.log(entries);

    entries.forEach(entry => {
        let class_name = entry.target.id
        const item = document.getElementsByClassName(class_name)[0];
        if (entry.isIntersecting) {
            entry.target.classList.add(active_class);
            item.classList.add(active_class);
        } else {
            entry.target.classList.remove(active_class);
            item.classList.remove(active_class);
        }
    });


};


const observer = new IntersectionObserver(callbackFunction, threshold_options_obj);
// observer.observe(box);

function createActiveSection() {
    sections.forEach(section => {
        observer.observe(section);

    });
}

createActiveSection();

