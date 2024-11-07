import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, clearUser} from './store/slices/authSlice';
import {Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/home/HomePage';
import {HeaderComponent} from './components/HeaderComponent';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './services/FirebaseConfiguration';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(clearUser());
            }

            return () => subscribe();
        });
    }, [dispatch]);

    return (
        <Router>
            <HeaderComponent />
            <Routes>
                <Route
                    path='/home'
                    element={<ProtectedRoute element={<HomePage />} />}
                />
                <Route path='/auth' element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default App;
