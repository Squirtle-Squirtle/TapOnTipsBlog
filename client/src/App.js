import './App.css';
import DataProvider from './context/DataProvider.jsx';
import Login from './components/account/Login.jsx'
import Home from './components/home/Home.jsx';
function App() {
  return (
    <div style={{ marginTop: '64px' }}>
      <DataProvider>
        <Login />
        <Home />
      </DataProvider>

    </div>
  );
}

export default App;
