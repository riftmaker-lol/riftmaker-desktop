import Logo from "@/assets/logo.svg";
import { BACKEND_URL } from "@/lib/env";
import { useStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useStore();
  return (
    <header className="py-4 container flex w-full">
      <img src={Logo} className="h-8" alt="React logo" />
      <div className="flex flex-grow justify-end items-center">
        {!user && (
          <Button asChild className="ml-4" variant={"outline"}>
            <a href={`${BACKEND_URL}/auth/signin?callbackUrl=/desktop/login`} target="_blank" rel="noreferrer">
              Login
            </a>
          </Button>
        )}
        {user && (
          <>
            <p>
              Logged in as <b>{user.name}</b>
            </p>
            <Button
              variant={"link"}
              onClick={() => {
                logout();
                navigate("/");
              }}
              className=" capitalize"
            >
              Logout ?
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
