import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;