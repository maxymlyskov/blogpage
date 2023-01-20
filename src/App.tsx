import { Routes, Route } from "react-router-dom";

import BlogItemDetails from "./components/BlogItemDetails";
import ChangePage from "./pages/ChangePage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details/:id" element={<BlogItemDetails />} />
      <Route path="/change/:id" element={<ChangePage />} />
    </Routes>
  );
}

export default App;
