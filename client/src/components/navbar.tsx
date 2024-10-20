import { useRecoilState } from "recoil";
import { authAtom } from "@/store/atoms/auth";
import { Button, buttonVariants } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfileDropDownProps = {
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = () => {
  const [isAuthorized, setIsAuthorized] = useRecoilState(authAtom);

  return (
    <nav className="flex items-center justify-between p-4">
      <Link to={"/"} className="text-lg font-medium">
        Task Manager
      </Link>

      {isAuthorized ? (
        <ProfileDropDown setIsAuthorized={setIsAuthorized} />
      ) : (
        <Link
          className={buttonVariants({ variant: "ghost", size: "sm" })}
          to={"/signin"}
        >
          Sign in
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

const ProfileDropDown = ({ setIsAuthorized }: ProfileDropDownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        ></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/tasks")}>
          Tasks
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setIsAuthorized(false);
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
