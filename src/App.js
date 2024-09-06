
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import "bootstrap/dist/css/bootstrap.css"
import Profile from './Profile';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route></Route>
      </Routes>
     </BrowserRouter>
    </div> 
  );
}

export default App;
