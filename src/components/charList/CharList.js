import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from "prop-types";

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1548,
        charEnded: false,
        charFocus: null,
        charSelected: null
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    charFocusOn = (id) => {
        this.setState({charFocus: id});
    }

    charFocusOff = () => {
        this.setState({charFocus: null});
    }

    charSelected = (id) => {
         this.setState({charSelected: id});
    }

    handleKeyDown = (event, id) => {
        if (event.key === 'Enter' || event.key === ' ') {
            this.props.onCharSelected(id);
            this.charSelected(id);
        }
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            // добавьте условие для изменения стиля при наведении
            let itemClass = 'char__item';
            if (this.state.charFocus === item.id) {
                itemClass += ' char__item_focus';
            }
            if (this.state.charSelected === item.id) {
                itemClass += ' char__item_selected';
            }

            return (
                <li
                    className={itemClass}
                    key={item.id}
                    tabIndex="0"
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.charSelected(item.id)
                    }}
                    onMouseEnter={() => this.charFocusOn(item.id)}
                    onMouseLeave={() => this.charFocusOff(item.id)}
                    onKeyDown={(event) => this.handleKeyDown(event, item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {
            charList, loading, error, offset,
            newItemLoading, charEnded
        } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;