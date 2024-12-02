//
import React, { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/Navbar/navbar.component";
import "./global.scss";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddJob from "./pages/jobs/AddJob.page";
//import Candidates from "./pages/candidates/Candidates.page";
//import AddCompany from "./pages/companies/AddCompany.page";
// import Home from "./pages/home/home.page";
//import Companies from "./pages/companies/Companies.page"

const Home = lazy(() => import("./pages/home/home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/jobs/Jobs.page"));
const AddCandidate = lazy(() => import("./pages/candidates/AddCandidate.page"));

const Candidates = lazy(() => import("./pages/candidates/Candidates.page"));
const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="candidates">
              <Route index element={<Candidates />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
