import { useState } from "react";
import { RandomChar } from "../randomChar/RandomChar.jsx";
import { CharList } from "../charList/CharList.jsx";
import { CharInfo } from "../charInfo/CharInfo.jsx";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

export const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null)

	const onCharSelected = (id) => {
		setSelectedChar(id)
	}

	return (
		<>
			<RandomChar />
			<div className="char__content">
				<CharList onCharSelected={onCharSelected} />
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}