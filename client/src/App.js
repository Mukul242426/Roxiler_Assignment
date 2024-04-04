import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import {Toaster} from 'react-hot-toast';

function App() {
  return (
   <>
   <Toaster/>
   <Routes>
      <Route path='/' element={<Dashboard/>}/>
   </Routes>
   </>
  );
}

export default App;
