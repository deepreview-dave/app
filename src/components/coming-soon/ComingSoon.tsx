import { SubscribeFrom } from "../subscribe/SubscribeForm";

export const ComingSoon = () => {
  return (
    <div className="content is-centered" style={{ textAlign: "center" }}>
      <h1>Coming Soon</h1>
      <p className="subtitle">
        This is a feature of DeepReview that we're actively developing.
      </p>
      <p className="subtitle">
        If you want to get an update when it's finally out, please consider
        subscribing using the form below.
      </p>
      <SubscribeFrom />
      <div>
        <figure className="image is-2by1">
          <img
            className="contain-fit"
            src="/images/coming-soon-1.jpg"
            alt="Coming Soon"
          />
        </figure>
      </div>
    </div>
  );
};
