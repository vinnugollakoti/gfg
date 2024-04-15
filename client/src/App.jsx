import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Algorithmist from './Components/Algorithmist'
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Algorithmist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
