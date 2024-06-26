import {Component} from "react";

import './charList.scss';
import MarvelService from "../../services/MarvelService";

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList();
    }

    componentWillUnmount() {
    }


    getCharList = () => {
        console.log("getCharList");
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList
        });
    }


    randomCharList = (charList) => {
        const characters = charList.map((char, index) => {
            const {name, thumbnail} = char;
            const isSelected = index === 1; // пример условия для выделения элемента
            const classNames = `char__item ${isSelected ? 'char__item_selected' : ''}`;

            return (
            <li key={index} className={classNames}>
                <img src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )
        })
        return characters;
    }

    render() {
        const {charList} = this.state;
        const items = this.randomCharList(charList);
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {items}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;