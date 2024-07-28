
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp'
function App() {
  return <>
   <BrowserRouter>
    <Routes>
    
      <Route path='/'element={<Home/>}/>
      <Route path='/profile'element={<Profile/>}/>
      <Route path='/About'element={<About/>}/>
     <Route path='/Signin' element={<SignIn/>}/>
     <Route path='/Signup'  element={<SignUp/>}/>
      </Routes>
   </BrowserRouter>
   </>
}


export default App