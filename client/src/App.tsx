import { Route, Routes } from "react-router-dom";
import LandingPage from './views/LandingPage';
import "tailwindcss/tailwind.css"
import FormImage from "./views/form/FormImage";
import FormDocs from "./views/form/FormDocs";


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/formImage' element={<FormImage />}/>
        <Route path='/formDoc' element={<FormDocs />}/>

      </Routes>
    </>
  )
}

export default App
