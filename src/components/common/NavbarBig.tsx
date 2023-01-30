import { API_ROUTES } from "../..";
import { LogoBig } from "./Logo";

export const NavbarBig = () => {
  return (
    <nav className="mt-6 mb-2">
      <a className="no-highlight" href={API_ROUTES.HOME}>
        <LogoBig />
      </a>
    </nav>
  );
};
