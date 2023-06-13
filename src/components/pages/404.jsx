import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';


const Page404 = () => {
	return (
		<div>
			<ErrorMessage />
			<p>
				<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
				<Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': 'pink' }} to="/">Back to main page</Link>
			</p>
		</div>
	)
}

export default Page404;

