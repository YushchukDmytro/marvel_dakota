import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';


const SingleComicPage = () => {

	const { comicId } = useParams();
	const [comic, setComic] = useState(null);
	const { loading, error, getComic, clearError } = useMarvelService();

/* eslint-disable */
	useEffect(() => { 
		updateComic();
	}, [comicId]);
/* eslint-disable */
	const updateComic = () => {
		clearError();
		getComic(comicId)
			.then(onComicLoaded)
	}

	const onComicLoaded = (comic) => {
		setComic(comic);
	};

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(loading || error || !comic) ? <ViewComic comic={comic} /> : null;

	return (
		<>
			{spinner}
			{errorMessage}
			{content}
		</>
	)
}


const ViewComic = ({ comic }) => {
	const { title, price, images, language, pageCount, description } = comic;
	console.log('Hi')
	return (
		<div className="single-comic">
			<img src={images} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}	

export default SingleComicPage;