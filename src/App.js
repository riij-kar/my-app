import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {fetchUsers} from './components/feature/users/userSlice';
import ModalProvider from './components/feature/modals/modalContext';

function App() {
  return (
    <>
    <ModalProvider>
        <Header />
        {/* <Footer /> */}
        <Outlet />
      </ModalProvider>
    </>
  );
}

export default App;
