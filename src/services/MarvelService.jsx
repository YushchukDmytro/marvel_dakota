
import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
	const{loading, request, error, clearError} = useHttp();

	const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
	const _apiKey = `apikey=f7f66d138dce6b9d83cb3c67d4986d55`;
	const _baseOffset = 210;


	const getAllCharacters = async (offset = _baseOffset) => {
		const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter)
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const getAllComics = async(offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics)
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`) ;
		return _transformComics(res.data.results[0]);
	}

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.series.name,
			price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not available",
			images: comics.thumbnail.path + "." + comics.thumbnail.extension,
			url: comics.series.resourceURI,
			language: comics.textObjects.language || "en-us",
			pageCount:comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
			description: comics.description ? comics.description : `No description`

		}
	}

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics:char.comics.items
		}
	}

	return{loading, error, getAllCharacters, getCharacter, getAllComics, clearError, getComic}
}