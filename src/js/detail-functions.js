import striptags from 'striptags';
import api from './api';
import defaultImg from '../images/default.jpg';

const { getBeerDetail, addLike, createComment } = api();

const commentsTemplate = (comments) => {
    if(comments){
        let commentsHTML = comments.map((element) => {
            return `<p class="comment">${element.comment}</p>`;
        });
        return commentsHTML.join('');
    }else{
        return '';
    }
};

const detailTemplate = ({ beerId, name, image, description, likes, comment, firstBrewed, price }) => `
<article id="${beerId}" class="detail">
        <div class="detail-image">
            <img src="${image ? image : defaultImg}" alt="${name}">
        </div>
        <header>
                <h2 class="detail-title">${name}</h2>
        </header>
        <div class="detail-text">
            <p class="detail-brewed">First brewed on ${firstBrewed}</p>
            <p class="detail-price">${price} €</p>
            <p class="detail-excerpt">${striptags(description)}</p>
            <span class="detail-likes"><i class="fas fa-heart"></i><p class="detail-number-likes">${likes}</p></span>
            <form id="comment-form" class="comment-input">
                  <textarea placeholder="Write your opinion" class="input comment" rows="3"></textarea>
                  <button type="submit" class="button comment">Publish</button>
            </form>
            <div class="comment-wrapper">
                ${commentsTemplate(comment)}
            </div>
        </div>
</article>
`;

const likeFunct = (id) => {
    const likeButton = document.querySelector('.detail-likes');
    likeButton.addEventListener('click', () => {
        if( localStorage[id] != 1 ){
            likeButton.classList.add('liked');
            addLike(id);
            let likeNumber = document.querySelector('.detail-number-likes').innerHTML;
            document.querySelector('.detail-number-likes').innerHTML = parseInt(likeNumber) + 1;
            localStorage.setItem(id, 1);
        }
    });
};

const commentFunct = (id) => {
    const commentForm = document.querySelector('#comment-form');
    const commentInput = document.querySelector('.input.comment');

    commentForm.addEventListener('submit', (evt) => {
        const commentValue = commentInput.value;
        evt.preventDefault();
        if (commentValue !== '') {
            createComment(id, commentValue);
            document.querySelector('.comment-wrapper').innerHTML += `<p class="comment">${striptags(commentValue)}</p>`;
            commentInput.value = '';
        }
    });

};

const renderDetail = async () => {
    try {
        const [, id] = window.location.search ? window.location.search.split('=') : [];
        const beer = await getBeerDetail(id);
        const beerHTML = detailTemplate(beer.beer);
        document.querySelector('main').innerHTML = beerHTML;

        likeFunct(id);
        commentFunct(id);
    } catch (e) {
        console.error(e);
    }
};

renderDetail();