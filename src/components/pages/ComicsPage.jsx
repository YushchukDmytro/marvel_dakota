import AppBanner from "../appBanner/AppBanner";
import { ComicsList } from "../comicsList/ComicsList.jsx";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";

export const ComicsPage = () => {
	return (
		<>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</>
	)
}