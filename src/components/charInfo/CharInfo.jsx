import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Skeleton } from '../skeleton/Skeleton';
import './charInfo.scss';

export const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();
/* eslint-disable */
    useEffect(() => {
        updateCharca();
    }, [props.charId]);
/* eslint-disable */
    const updateCharca = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    };


    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <ViewChar char={char} /> : null;
    const skeleton = loading || error || char ? null : <Skeleton />

    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {skeleton}
            {content}
        </div>
    )
};

const ViewChar = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? { 'objectFit': "unset" } : { 'objectFit': "cover" };
    const comicsRender = comics.map((item, i) => {
        // eslint-disable-next-line
        if (i > 9) return;
        return (
            <li
                className="char__comics-item"
                key={i}>
                {item.name}
            </li>
        )
    });

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description.length > 0 ? description : "ups!! Where is descr? Omg"}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsRender < 1 ? "sory dont have comics" : comicsRender}
            </ul>
        </>
    )
};