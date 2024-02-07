import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import { useStateContext } from "../../context";

export default function NavBar() {
  const { isMobile } = useStateContext();
  return (
    <Navbar
      fluid
      className={`bg-gray-50 dark:border-b dark:border-gray-700 shadow dark:shadow-lg fixed ${
        isMobile ? "left-[4rem]" : "left-[16rem]"
      } top-0 right-0 z-[1000]`}
    >
      <div></div>

      <div className="flex items-center">
        <DarkThemeToggle className="mr-3" />
        {/* <Dropdown
              inline
              label={<Avatar alt="" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  Bonnie Green
                </span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item>
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                Sign out
              </Dropdown.Item>
            </Dropdown> */}
      </div>
    </Navbar>
  );
}
