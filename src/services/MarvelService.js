import { Component } from 'react';
class MarvelService extends Component {
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
    _apiKey = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;


    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    }
}

export default MarvelService;
