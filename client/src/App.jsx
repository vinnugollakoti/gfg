import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Algorithmist from './Components/Algorithmist'
import Form from './Components/Form'
import Sucess from './Components/Sucess'
import SuccessPage from './Components/SuccessPage'
import './App.css'
import './Form.css'
import './Sucess.css'
import './Loader.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Algorithmist />} />
        <Route path='/form' element={<Form />} />
        <Route path='/sucess' element={<Sucess />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
