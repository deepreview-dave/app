import { ReactComponent as LogoSvg } from "./logo.svg";

export const Logo = () => {
  return (
    <div className="columns is-vcentered is-centered is-mobile m-0 p-0">
      <div className="column is-narrow p-0 logo-holder">
        <LogoSvg className="logo-icon" />
      </div>
      <div className="column is-narrow">
        <div className="logo-text is-size-4">DeepReview</div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="mt-6 mb-2">
      <Logo />
    </nav>
  );
};
