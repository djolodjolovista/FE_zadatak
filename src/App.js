import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import DragAndDropScreen from "./screens/DragAndDropScreen";
import IntroScreen from "./screens/IntroScreen";
import NewCompanyScreen from "./screens/NewCompanyScreen";
import CompaniesScreen from "./screens/CompaniesScreen";
import ShowMoreScreen from "./screens/ShowMoreScreen";
import EditCompany from "./screens/EditCompany";

function App() {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
       <Routes>
         <Route path="/" element={<IntroScreen />} />
         <Route path="/show-more" element={<ShowMoreScreen />} />
         <Route path="/companies" element={<CompaniesScreen />} />
         <Route path="/drag-and-drop" element={<DragAndDropScreen />} />
         <Route path="/new-company" element={<NewCompanyScreen />} />
         <Route path="/edit-company/:companyId" element={<EditCompany />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
