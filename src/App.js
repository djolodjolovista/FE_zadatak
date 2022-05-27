import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import DragAndDropScreen from "./screens/DragAndDropScreen";
import IntroScreen from "./screens/IntroScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ShowMoreScreen from "./screens/ShowMoreScreen";

function App() {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
       <Routes>
         <Route path="/" element={<IntroScreen />} />
         <Route path="/show-more" element={<ShowMoreScreen />} />
         <Route path="/projects" element={<ProjectScreen />} />
         <Route path="/drag-and-drop" element={<DragAndDropScreen />} />
         <Route path="/new-project" element={<NewProjectScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
