import { useLinkClickHandler, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { useStateContext } from "../../context";

export default function AppNavLink({ to, text, icon }) {
  const location = useLocation();
  const {navbarShrink} = useStateContext();
  const clickHandler = useLinkClickHandler(to);

  return (
    <span onClick={clickHandler}>
      <Sidebar.Item icon={icon} href={to} className={`sidebar-item ${location.pathname === to ? 'active' : ''}`}>
        { !navbarShrink && text}
      </Sidebar.Item>
    </span>
  );
}
