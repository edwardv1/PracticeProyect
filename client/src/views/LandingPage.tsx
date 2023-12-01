import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className=" bg-slate-400 w-full h-screen flex flex-col items-center justify-center">
        <h1 className=' text-orange-400'>Landing Page</h1>
        <h3>Proyect Practice</h3>
        <Link to="/formImage">
          <button>Form Image</button>
        </Link>
        <Link to="/formDoc">
          <button>Form Doc</button>
        </Link>
    </div>
  )
}

export default LandingPage;