
import { Routes,Route,Link } from "react-router-dom"

function Nav() {
  return (
   <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/upload">Uploads</Link>
        <Link to="/font-group">Group List</Link>
        <Link to="/create-font-group">Create group</Link>
      </nav>

      
   </>
  )
}
export default Nav