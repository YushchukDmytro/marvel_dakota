import { useState, useEffect, useRef } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import './charList.scss';

export const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);


    const { loading, error, getAllCharacters } = useMarvelService();
/* eslint-disable */
    useEffect(() => {
        onRequest(offset, true)
    }, [])
/* eslint-disable */
    const onRequest = (offset, initial) => {
        initial ? setNewCharLoading(false) : setNewCharLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)

    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }


    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? { 'objectFit': "unset" } : { 'objectFit': "cover" };

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={i}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id)
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
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

    const items = renderItems(charList);

    const spiner = loading && !newCharLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list">
            {spiner}
            {errorMessage}
            {items}
            <button
                className="button button__main button__long"
                // disabled={newCharLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
};