import { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { reducer, initialState } from './reducer/userReducer';
import { UserContextState, UserContextDispatch } from './context/userContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContextState.Provider value={state}>
      <UserContextDispatch.Provider value={dispatch}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
          <Routes>
            {state && state.token && <Route path="/profile/:id" element={<Home /> } />}
            {state && state.token && <Route path="*" element={<Navigate to={`/profile/${state.user._id}`} />} />}
            {state && !state.token && <Route path="/login" element={<Login />} />}
            {state && !state.token && <Route path="/signup" element={<SignUp />} />}
            {state && !state.token && <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Router>
      </UserContextDispatch.Provider>
    </UserContextState.Provider>
  );
}

export default App;
