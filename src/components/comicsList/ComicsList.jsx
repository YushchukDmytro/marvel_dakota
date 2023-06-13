import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './comicsList.scss';

export const ComicsList = () => {

    const [offset, setOffset] = useState(0);
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [comicsEnded, swtComicsEnded] = useState(false);

    const { getAllComics, loading, error } = useMarvelService();
/* eslint-disable */
    useEffect(() => {
        onRequest(offset, true)
    }, [])
/* eslint-disable */
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset + 8);
        swtComicsEnded(ended);
    }


    function renderComics(arr) {
        const items = arr.map((item, i) => {

            const priceNone = item.price === 0 ? 'NOT AVAILABLE' : item.price + '$';
            return(
                <li 
                    className="comics__item" 
                    key={i}
                    tabIndex={0}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.images} alt={item.title} className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{priceNone}</div>
                        </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comicsList);

    const spiner = loading && !newComicsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;


    return (
        <div className="comics__list">
            {spiner}
            {errorMessage}
            {items}
            <button 
                className="button button__main button__long" 
                onClick={() => onRequest(offset)}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
};