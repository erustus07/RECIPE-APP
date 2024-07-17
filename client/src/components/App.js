import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Recipes from "./Recipes";
import RecipeForm from "./RecipeForm";
import RecipeDetails from "./RecipeDetails";
import DiscoverPage from "./DiscoverPage";  // Import DiscoverPage
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/add" element={<RecipeForm />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="/discover" element={<DiscoverPage />} />  {/* Add this line */}
      </Routes>
    </Router>
  );
}





















// import React from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
// } from "react-router-dom";
// import Navbar from "./Navbar";
// import Home from "./Home";
// import Login from "./user/Login";
// import Register from "./user/Register";
// import Recipes from "./Recipes";
// import RecipeForm from "./RecipeForm";
// import RecipeDetails from "./RecipeDetails";
// import DiscoverPage from "./DiscoverPage";  // Import DiscoverPage
// import "./App.css";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" replace />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/recipes" element={<Recipes />} />
//         <Route path="/recipes/add" element={<RecipeForm />} />
//         <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
//         <Route path="/discover" element={<DiscoverPage />} />  {/* Add this line */}
//       </Routes>
//     </Router>
//   );
// }
