import { ReactComponent as LogoSvg } from "./logo.svg";

export const LogoBig = () => {
  return (
    <div className="columns is-vcentered is-centered is-mobile m-0 p-0">
      <div className="column is-narrow p-0 logo-holder">
        <LogoSvg className="logo-icon" />
      </div>
      <div className="column is-narrow">
        <span className="logo-text is-size-4">DeepReview</span>
      </div>
    </div>
  );
};

export const LogoSmall = () => {
  return (
    <div className="columns is-vcentered is-centered is-mobile m-0 p-0">
      <div className="column is-narrow p-0 logo-holder">
        <LogoSvg className="logo-icon-small" />
      </div>
      <div className="column is-narrow">
        <span className="logo-text is-size-6">DeepReview</span>
      </div>
    </div>
  );
};
