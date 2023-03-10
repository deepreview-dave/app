import { useEffect } from "react";
import { API_ROUTES } from "../..";
import { Analytics } from "../../business/analytics";
import { Footer } from "../../components/common/Footer";
import { NavbarBig } from "../../components/common/NavbarBig";
import { SubscribeFrom } from "../../components/subscribe/SubscribeForm";
import { ResumeAnalyserCard } from "./ResumeAnalyserCard";

export const HomePage = () => {
  useEffect(() => {
    Analytics.loaded();
  }, []);

  const PageInfo = () => {
    return (
      <div className="content has-text-centered">
        <h1 className="title has-text-weight-bold">AI powered inspiration</h1>
        <h3
          className="subtitle mt-2 has-text-weight-normal"
          style={{ lineHeight: "32px" }}
        >
          DeepReview helps anyone write compelling resumes, cover letters,
          performance reviews and more, in just minutes.
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
                  src="/images/cover-1.jpg"
                  alt="Cover Letters"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Cover Letters</h4>
                <p>
                  Find the right words to highlight why you're the best fit for
                  that special job.
                </p>
                <p>
                  <a
                    href={API_ROUTES.RESUME_COVER_LETTER}
                    className="button is-primary"
                  >
                    Try it out!
                  </a>
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
                  src="/images/referral-1.jpg"
                  alt="Referral Letters"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Referral Letters</h4>
                <p>
                  Get help writing a Referral Letter for a colleague or friend.
                </p>
                <p>
                  <a
                    href={API_ROUTES.RESUME_REFERRAL}
                    className="button is-primary"
                  >
                    Try it out!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-12">
          <hr />
        </div>
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img
                  className="cover-fit"
                  src="/images/perf-review-1.jpg"
                  alt="Performance Reviews"
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
                  <a
                    href={API_ROUTES.PERF_REVIEW_PERSONA}
                    className="button is-primary"
                  >
                    Try it out!
                  </a>
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
                  src="/images/praise-1.jpg"
                  alt="Give Praise"
                />
              </figure>
            </div>
            <div className="card-content is-overlay">
              <span className="tag is-dark is-pulled-right">NEW</span>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Give Praise</h4>
                <p>
                  Say thank you to a colleague that helped you out and let
                  DeepReview guide you.
                </p>
                <p>
                  <a href={API_ROUTES.PRAISE} className="button is-primary">
                    Try it out!
                  </a>
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
            <div className="card-content is-overlay">
              <span className="tag is-dark is-pulled-right">NEW</span>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Compensation & Promotions</h4>
                <p>
                  Discussions about compensation and promotion are some of the
                  hardest. Let DeepReview help with that.
                </p>
                <p>
                  <a
                    href={API_ROUTES.COMPENSATION}
                    className="button is-primary"
                  >
                    Try it out!
                  </a>
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
                  src="/images/resignation-1.jpg"
                  alt="Resignation Letter"
                />
              </figure>
            </div>
            <div className="card-content is-overlay">
              <span className="tag is-dark is-pulled-right">NEW</span>
            </div>
            <div className="card-content">
              <div className="content">
                <h4>Resignation Letter</h4>
                <p>
                  Saying goodbye is always hard. Let DeepReview help with that.
                </p>
                <p>
                  <a
                    href={API_ROUTES.RESIGNATION_LETTER}
                    className="button is-primary"
                  >
                    Try it out!
                  </a>
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
          {/* <hr /> */}
          <ResumeAnalyserCard />
          <div className="mt-6"></div>
          <AvailableOptions />
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
