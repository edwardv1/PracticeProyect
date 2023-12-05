import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className=" bg-stone-100 dark:bg-slate-900 w-full h-screen flex flex-col items-center justify-center">
        <h1 className=' text-orange-400'>Landing Page</h1>
        <h3>Proyect Practice</h3>
        <Link to="/formImage">
          <button>Form Image</button>
        </Link>
        <Link to="/formDoc">
          <button>Form Doc</button>
        </Link>
        <Link to="/formVideo">
          <button>Form Video</button>
        </Link>
    </div>
  )
}

export default LandingPage;