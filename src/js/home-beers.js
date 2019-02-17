import striptags from 'striptags';
import api from './api';
import defaultImg from '../images/default.jpg';

const { getBeers } = api();

const templateBeers = ({ beerId, name, image, description, likes }) => `
<article id="${beerId}" class="card">
    <a href="detail.html?id=${beerId}">
        <div class="card-image">
            <img src="${image ? image : defaultImg}" alt="${name}">
        </div>
        <div class="card-text">
            <header>
                <h2 class="card-title">${name}</h2>
            </header>
            <p class="card-excerpt">${striptags(description).split(' ').slice(0,30).join(' ')}...</p>
            <p class="card-likes"><i class="fas fa-heart"></i>${likes}</p>
        </div>
    </a>
</article>
`;

const renderBeers = (element, beers) => {
    const htmlBeers = beers.slice(0, 10).map((beer) => {
        return templateBeers(beer);
    }).join('');
    element.innerHTML = htmlBeers;
};

export const renderBeersByDate = async (date) => {
    try {
        const fetchBeers = await getBeers();
        const main = document.querySelector('main');
        const filteredBeers = fetchBeers.beers.filter((beer) => {
            if (beer.firstBrewed.slice(3) == date){
                return beer ;
            }
        });
        renderBeers(main, filteredBeers);
    } catch (e) {
        console.error(e);
    }
};
  
export const renderDOMBeers = async (query) => {
    try {
        const fetchBeers = await getBeers(query);
        const main = document.querySelector('.home-main');
        renderBeers(main, fetchBeers.beers);
    } catch (e) {
        console.error(e);
    }
};
  
renderDOMBeers();
  