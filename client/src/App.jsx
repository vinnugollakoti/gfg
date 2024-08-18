import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Algorithmist from './Components/Algorithmist'
import Form from './Components/Form'
import './App.css'
import './Form.css'
import './Loader.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Algorithmist />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
