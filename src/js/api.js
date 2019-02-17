
const API_KEY = 'N72SD68-AQ348MV-JGGHAWW-BYAATA9';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/') => {
    const SEARCH_API_URL = `${API_URL}beers?search=`;
    const BEERS_URL = `${API_URL}beers`;
    return {
        createComment: async (id, text) => {
            try {
                const response = await fetch(`${BEERS_URL}/${id}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    },
                    body: JSON.stringify({
                        'comment': text,
                    })
                });
                if (!response.ok) {
                    throw 'Error';
                }
                const comment = await response.json();
                return comment;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        addLike: async (id) => {
            try {
                const response = await fetch(`${BEERS_URL}/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'X-API-KEY': API_KEY,
                    }
                });
                if (!response.ok) {
                    throw 'Error';
                }
                const like = await response.json();
                return like;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        getBeers: async (query) => {
            try {
                const requestUrl = query ?
                    `${SEARCH_API_URL}${query}` :
                    BEERS_URL;
                const response = await fetch(requestUrl, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'X-API-KEY': API_KEY,
                    }
                });
                const datos = await response.json();
                return datos;
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        getBeerDetail: async (id) => {
            try {
                const response = await fetch(`${BEERS_URL}/${id}`, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY,
                    }
                });
                const beer = await response.json();
                return beer;
            } catch(e) {
                console.error(e);
                throw e;
            }
        },
    };
};

export default api;
