import { Route, Routes } from "react-router-dom";
import LandingPage from './views/LandingPage';
import "tailwindcss/tailwind.css"
import FormImage from "./views/form/FormImage";
import FormDocs from "./views/form/FormDocs";
import FormVideo from "./views/form/FormVideo";
import Header from "./components/header/Header";

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/formImage' element={<FormImage />}/>
        <Route path='/formDoc' element={<FormDocs />}/>
        <Route path='/formVideo' element={<FormVideo />}/>
      </Routes>
    </>
  )
}

export default App
