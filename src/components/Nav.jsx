
import { Routes,Route,Link } from "react-router-dom"

function Nav() {
  return (
   <>
      <nav className="flex m-auto text-center justify-center  gap-8 bg-[#F3F4F6] py-5 gap-6 uppercase mb-10">
        <Link to="/">Home</Link>
        <Link to="/upload">Uploads Fonts</Link>
        <Link to="/font-group">Fonts Group</Link>
        <Link to="/create-font-group">Create group</Link>
      </nav>

      
   </>
  )
}
export default Nav