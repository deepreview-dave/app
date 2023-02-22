import { API_ROUTES } from "../..";

export const Footer = () => {
  return (
    <footer className="footer p-6 has-background-grey-darker has-text-white">
      <div className="content has-text-centered">
        <p>
          <a
            href="https://www.producthunt.com/posts/deepreview?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-deepreview"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=377229&theme=light"
              alt="DeepReview - Write&#0032;CVs&#0044;&#0032;cover&#0032;letters&#0044;&#0032;perf&#0032;reviews&#0032;with&#0032;the&#0032;power&#0032;of&#0032;AI | Product Hunt"
              width="250"
              height="54"
            />
          </a>
        </p>
        <p>
          <b>Deep Review</b>. The source code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        <address className="m-2">
          Contact us at{" "}
          <a href={API_ROUTES.MAIL_TO_CONTACT}>contact@deepreview.eu</a>.
        </address>
        <p>
          <a href={API_ROUTES.PRIVACY_POLICY}>Privacy policy.</a>
          <span className="ml-2 mr-2">|</span>
          <a href={API_ROUTES.COOKIE_POLICY}>Cookie policy</a>
        </p>
        <p>
          <small>
            <a href="https://www.freepik.com/free-vector/young-investors-working-profit-dividend-revenue_9173917.htm#query=illustrations%20money&position=3&from_view=search&track=sph">
              Compensation Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/young-businessman-was-admired-from-anypeople-with-thump-up-business-successful-concept-cartoon-character-vector-illustration_22821994.htm#query=illustrations%20feedback&position=2&from_view=search&track=sph">
              Feedback Image by jcomp
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/cv-best-candidate-mans-hands-flat-vector-illustration-company-looking-employee-headhunter-hiring-people-human-resource-management-job-interview-concept_26921631.htm#query=illustrations%20cv&position=1&from_view=search&track=sph">
              Cv Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/active-tourist-hiking-mountain-man-wearing-backpack-enjoying-trekking-looking-snowcapped-peaks-vector-illustration-nature-wilderness-adventure-travel-concept_10606146.htm#query=illustrations%20backpack&position=1&from_view=search&track=sph">
              Backpacker Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/cheerful-couple-boosting-with-jet-pack-isolated-flat-illustration_11235261.htm#page=6&position=25&from_view=author">
              Praise Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/new-employees-requiring-office-work-isolated-flat-vector-illustration-cartoon-hr-manager-hiring-recruiting-personnel-recruitment-vacancy-business-concept_10613259.htm#page=11&position=21&from_view=author">
              Resignation Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/tiny-business-persons-working-jigsaw-puzzle-together-metaphor-cooperation-partnership-collaboration-team-people-flat-vector-illustration-communication-teamwork-concept_28480855.htm#page=11&position=17&from_view=author">
              Coming Soon Image by pch.vector
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_12849227.htm#query=success&position=9&from_view=search&track=sph">
              Success Image by syarifahbrit
            </a>{" "}
            on Freepik
            {" | "}
            <a href="https://www.freepik.com/free-vector/manager-prioritizing-tasks-list_7732645.htm#page=3&position=8&from_view=author">
              Image by pch.vector
            </a>{" "}
            on Freepik
          </small>
        </p>
      </div>
    </footer>
  );
};
