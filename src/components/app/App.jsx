import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { MainPage, ComicsPage } from "../pages";
import { AppHeader } from "../appHeader/AppHeader";


export const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />}/>
                        <Route path="/comics" element={<ComicsPage />}/>
                    </Routes >
                </main>
            </div>
        </Router>
    )
};

