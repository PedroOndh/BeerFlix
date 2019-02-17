import api from './api';
import { renderDOMBeers, renderBeersByDate } from './home-beers';

const { getBeers } = api();

let navbar = document.querySelector('.app-navbar');
let icons = document.querySelector('.navbar-icon');

icons.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.input.search');

searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (searchInput.value !== '') {
        renderDOMBeers(searchInput.value);
    }
});


const templateYears = (date) => `<div class="date-button">${date}</div>`;

const searchByDate = () => {
    const dateButton = document.querySelectorAll('.date-button');
    dateButton.forEach(button => {
        button.addEventListener('click', () => {
            renderBeersByDate(button.innerHTML);
        });
});
}

const beersYears = async () => {
    try {
        const fetchBeers = await getBeers();
        const yearsContainer = document.querySelector('.date-buttons');
        let yearsArray = [];
        const beersList = fetchBeers.beers;
        for (let i = 0; i < beersList.length; i++) {
            let year = beersList[i].firstBrewed.slice(3);
            if (yearsArray.indexOf(year) < 0){
                yearsArray.push(year);
            }
        }
        const years = yearsArray.sort(function(a, b) {
            return a - b;
        });
        const yearsHTML = years.map((y)=> { return templateYears(y); }).join('');
        yearsContainer.innerHTML = yearsHTML;
        
        searchByDate();
      
    } catch (e) {
        console.error(e);
    }
};

beersYears();