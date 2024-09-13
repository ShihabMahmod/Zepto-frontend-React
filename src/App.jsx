
import Home from "./pages/Home.jsx"
import { Routes,Route,Link } from "react-router-dom"
import Upload from "./pages/Upload.jsx"
import FontGroupList from "./pages/fonts-group/FontGroupList.jsx"
import CreateGroup from "./pages/fonts-group/CreateGroup.jsx"
import EditGroup from "./pages/fonts-group/EditGroup.jsx"
import Nav from "./components/Nav.jsx"

function App() {
  return (
   <>
  
      <Nav />
      <Routes>
        <Route 
            path="/" element={<Home />}
        />

        <Route 
            path="/upload" element={<Upload />}
        />

        <Route 
            path="/font-group" element={<FontGroupList />}
        />

        <Route 
            path="/create-font-group" element={<CreateGroup />}
        />

      <Route 
      
        path="edit-group/:id" element={<EditGroup />} 
      />
       
      </Routes>
      
   </>
  )
}
export default App
