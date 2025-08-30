import { Outlet, Link } from "react-router-dom";
import Header from "./Header/Header";
import Container from "./Section/Container";
import LeftSection from "./LeftSection";
import Dashboard from "./Dashboard";
function Layout() {
     return (
      <>
      <Header></Header>
        <div className='section'>
            <LeftSection/>
            <Outlet></Outlet>
        </div>
        </>
    )
}

export default Layout;
