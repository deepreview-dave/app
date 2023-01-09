import { Link } from "react-router-dom";
import { LogoBig } from "./Logo";

export const NavbarBig = () => {
  return (
    <nav className="mt-6 mb-2">
      <Link className="no-highlight" to={"/"}>
        <LogoBig />
      </Link>
    </nav>
  );
};
