import Home from './Components/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import MainPage from './Components/Main/MainPage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/mainpage' element = {<MainPage/>} />
      </Routes>
    </>
  )
}

export default App
