import { useState, useEffect } from 'react';
import { Spinner } from '../spinner/Spinner'
import { useMarvelService } from '../../services/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

export const RandomChar = () => {

    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();
/* eslint-disable */
    useEffect(() => {
        updateChar();
    }, []);
/* eslint-disable */
    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
};

const View = ({ char }) => {

    const { name, thumbnail, description, homepage, wiki } = char;
    const strDescr = String(description)
    const descr = strDescr === "" ? 'Not description' : strDescr.length > 130 ? strDescr.slice(0, 130) + '...' : strDescr;
    const imgThumb = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={thumbnail === imgThumb ? { objectFit: "contain" } : { objectFit: "cover" }} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}