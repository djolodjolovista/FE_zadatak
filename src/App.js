import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import DragAndDropScreen from "./screens/DragAndDropScreen";
import IntroScreen from "./screens/IntroScreen";
import NewCompanyScreen from "./screens/NewCompanyScreen";
import CompaniesScreen from "./screens/CompaniesScreen";
import ShowMoreScreen from "./screens/ShowMoreScreen";
import EditCompanyScreen from "./screens/EditCompanyScreen";
import DeleteScreen from "./screens/DeleteScreen";
import ProtectedRoutes from "./ProtectedRoutes";



function App() {
  


  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
       <Routes>
         <Route path="/" element={<IntroScreen />}  />
         <Route element={<ProtectedRoutes />} >
         <Route path="/show-more" element={<ShowMoreScreen />} />
         <Route path="/companies" element={<CompaniesScreen />} />
         <Route path="/drag-and-drop" element={<DragAndDropScreen />} />
         <Route path="/new-company" element={<NewCompanyScreen />} />
         <Route path="/edit-company/:companyId" element={<EditCompanyScreen />} />
         <Route path="/delete-company/:companyId" element={<DeleteScreen />} /> 
         </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
