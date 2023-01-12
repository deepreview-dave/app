import { Link } from "react-router-dom";
import { API_ROUTES } from "..";
import { Footer } from "../components/common/Footer";
import { NavbarBig } from "../components/common/NavbarBig";
import { SubscribeFrom } from "../components/subscribe/SubscribeForm";

export const HomePage = () => {
  const PageInfo = () => {
    return (
      <div className="content has-text-centered">
        <h1 className="title has-text-weight-bold">
          Make difficult career conversations easier
        </h1>
        <h3
          className="subtitle mt-2 has-text-weight-normal"
          style={{ lineHeight: "32px" }}
        >
          DeepReview helps you find the right words to make difficult career
          conversations easier using the{" "}
          <span className="is-underlined">power of AI</span>.
        </h3>
      </div>
    );
  };

  const AvailableOptions = () => {
    return (
      <div className="columns has-text-centered is-multiline">
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img
                  className="cover-fit"
                  src="/images/perf-review-1.jpg"
                  alt="Performace Reviews"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Performance Reviews</h4>
                <p>
                  Automatically generate meaningful performance reviews for
                  yourself, a colleague or a manager.
                </p>
                <p>
                  <Link
                    to={API_ROUTES.PERF_REVIEW_PERSONA}
                    className="button is-primary"
                  >
                    Try it out!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img
                  className="cover-fit"
                  src="/images/comp-1.jpg"
                  alt="Compensation & Promotions"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Compensation & Promotions</h4>
                <p>
                  Discussions about compensation and promotion are some of the
                  hardest. Let DeepReview help with that.
                </p>
                <p>
                  <button disabled className="button is-primary">
                    Coming soon
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img
                  className="cover-fit"
                  src="/images/cv-1.jpg"
                  alt="Resumes & Cover Letters"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Resumes & Cover Letters</h4>
                <p>
                  Finding the right words to highlight the best of you can be
                  time consuming. Let DeepReview help with that.
                </p>
                <p>
                  <button disabled className="button is-primary">
                    Coming soon
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img
                  className="cover-fit"
                  src="/images/more-1.jpg"
                  alt="More"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>And Much More</h4>
                <p>
                  Stay tuned for even more features aimed at making difficult
                  career conversations just a bit easier.
                </p>
                <p>
                  <button disabled className="button is-primary">
                    Coming soon
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-body">
      <NavbarBig />
      <div className="layout m-4">
        <div className="container narrow-container">
          <hr />
          <PageInfo />
          <hr />
          <AvailableOptions />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
