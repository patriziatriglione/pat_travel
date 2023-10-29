import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Footer from './pages/components/Footer';
import Container from 'react-bootstrap/Container';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Login from "./pages/Login"
import GreenPack from './pages/GreenPack';
import Activity from './pages/Activity';
import Food from './pages/Food';
import PackPage from './pages/PackPage';
import Reserve from './pages/Reserve';
import NewStructure from './pages/NewStructure';
import NewPackage from './pages/NewPackage';
import NewFood from './pages/NewFood';
import NewActivity from './pages/NewActivity';
import Settings from './pages/Settings';

function App() {
  const currentTheme = useSelector((state) => state.theme);
  const Layout = () => {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Container fluid className={currentTheme ? "darkTheme" : ""}>
              <Layout />
            </Container>
          }
          >
            <Route path="/" element={<Home />} />
            <Route path="/greenPack" element={<GreenPack />} />
            <Route path="/greenPack/:id" element={<PackPage />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/food" element={<Food />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path='/newStructure' element={<NewStructure />} />
            <Route path="/newPackage" element={<NewPackage />} />
            <Route path="/newFood" element={<NewFood />} />
            <Route path='/newActivity' element={<NewActivity />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

