import { ReactComponent as LogoSvg } from "./logo.svg";

export const Logo = () => {
  return (
    <div className="columns is-vcentered is-centered is-mobile">
      <div className="column is-narrow p-0 logo-holder">
        <LogoSvg className="logo-icon" />
      </div>
      <div className="column is-narrow">
        <div className="logo-text is-size-4">
          <strong>deepreview</strong>
        </div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <section className="hero is-link has-text-centered">
      <div className="hero-body">
        <Logo />
        <p className="has-text-white-ter">
          Take the drudgery out of performance reviews!
        </p>
      </div>
    </section>
  );
};
