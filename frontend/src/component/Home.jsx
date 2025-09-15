import "./Component.css";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import FooterSec from "../FooterSec/FooterSec";

const Menu = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterSec />
    </>
  );
};

export default Menu;
