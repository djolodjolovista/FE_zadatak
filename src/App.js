import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import DragAndDropscreen from "./screens/DragAndDropscreen";
import Introscreen from "./screens/Introscreen";
import Newprojectscreen from "./screens/Newprojectscreen";
import Projectscreen from "./screens/Projectscreen";
import Showmorescreen from "./screens/Showmorescreen";

function App() {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
       <Routes>
         <Route path="/" element={<Introscreen />} />
         <Route path="/showmore" element={<Showmorescreen />} />
         <Route path="/projects" element={<Projectscreen />} />
         <Route path="/draganddrop" element={<DragAndDropscreen />} />
         <Route path="/newproject" element={<Newprojectscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
