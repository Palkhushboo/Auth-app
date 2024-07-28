
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Head from './Component/Head';
function App() {
  return <>
   <BrowserRouter>
   {/*header*/}
   <Head/>
    <Routes>
    
      <Route path='/'element={<Home/>}/>
      <Route path='/Profile'element={<Profile/>}/>
      <Route path='/About'element={<About/>}/>
     <Route path='/Signin' element={<SignIn/>}/>
     <Route path='/Signup'  element={<SignUp/>}/>
      </Routes>
   </BrowserRouter>
   </>
}


export default App