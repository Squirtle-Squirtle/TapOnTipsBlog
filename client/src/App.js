import './App.css';
import DataProvider from './context/DataProvider.jsx';
import Login from './components/account/Login.jsx'
import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';


import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
      <Header/>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider >
  );
}

export default App;
