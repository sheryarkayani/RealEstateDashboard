import { Sidebar } from "flowbite-react";
import { AiOutlineCompass } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { BiBuoy } from "react-icons/bi";
import AppNavLink from "../navLink";
import { useStateContext } from "../../context";
import logoImage from "../../assets/logo.png";

export default function SideBar() {
    const {navbarShrink} = useStateContext();
  return (
    <Sidebar className={`${navbarShrink ? 'w-[4rem]' : ''} side-bar h-screen sticky top-0 left-0 bottom-0 shadow border-r border-[gainsboro] dark:border-r dark:border-gray-700`}>
      <Sidebar.Logo
      className="sidebar-logo"
        href="/"
      >
      <div className="flex items-center">
        <img src={logoImage} alt="Your Company Logo" />
  
      {!navbarShrink &&
        <p className="ml-2">Avenue5 Overview </p>
      }
      </div>
      </Sidebar.Logo>
      <Sidebar.Items className="flex flex-col h-[90%]">
        <Sidebar.ItemGroup className="flex-1">
          <AppNavLink icon={AiOutlineCompass} to={"/"} text={"Explore"} />
          <AppNavLink
            icon={MdOutlineDashboard}
            to={"/dashboard"}
            text={"Dashboard"}
          />
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <AppNavLink
            icon={BiBuoy}
            to={"/help"}
            text={"Help"}
          />
        
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
