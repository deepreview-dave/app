import { useEffect } from "react";
import { API_ROUTES } from "..";
import { Analytics } from "../business/analytics";
import { Footer } from "../components/common/Footer";
import { NavbarMin } from "../components/common/NavbarMin";
import { SubscribeFrom } from "../components/subscribe/SubscribeForm";

export const CookiePolicyPage = () => {
  useEffect(() => {
    Analytics.loaded();
  }, []);

  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h1>Cookie Policy</h1>
            <h2>What are Cookies?</h2>
            <p>
              Cookies and other similar tracking technologies are small text
              files or code placed on your device (e.g. computer, smartphone or
              other electronic device) when you use our website or app (the
              “Site”) or view a message. Cookies allow a website or app to
              recognise a particular device.
            </p>
            <h2>Our use of Cookies</h2>
            <p>
              We use cookies and other similar tracking technologies such as web
              beacons and single-pixel gifs on our Site. These help us recognise
              you and your device and store some information about your
              preferences or past actions.
            </p>
            <p>
              For example, we may monitor how many times you visit our Site,
              which pages you go to, traffic data, location data and the
              originating domain name of your internet service provider. This
              information helps us to build a profile of our users. Some of this
              data will be aggregated or statistical, which means that we will
              not be able to identify you individually.
            </p>
            <p>
              You can set your browser not to accept cookies and you can find
              out how to remove cookies from your browser below. However, some
              of our Site features may not function as a result.
            </p>
            <p>
              For further information on our use of cookies and other similar
              tracking technologies, including a detailed list of your
              information which we and others may collect through cookies,
              please see below.
            </p>
            <h2>What we use cookies for</h2>
            <p>We use cookies and other similar tracking technologies to:</p>
            <ul>
              <li>
                recognise you whenever you visit our Site (this speeds up your
                access to our Site as you do not have to log in each time);
              </li>
              <li>
                obtain information about your preferences and use of our Site;
              </li>
              <li>
                carry out research and statistical analysis to help improve our
                content and services and to help us better understand our users’
                requirements;
              </li>
              <li>
                [target our marketing and advertising campaigns and those of our
                affiliates more effectively by providing interest-based
                advertisements that are personalised to your interests;] and
              </li>
              <li>make your online experience more efficient and enjoyable.</li>
            </ul>
            <h2>Types of cookies</h2>
            <p>
              The cookies we place on your device fall into the following
              categories:
            </p>
            <ul>
              <li>
                Session cookies — these allow our Site to link your actions
                during a particular browser session. These expire each time you
                close your browser and do not remain on your device afterwards.
              </li>
              <li>
                Persistent cookies — these are stored on your device in between
                browser sessions. These allow your preferences or actions across
                our Site to be remembered. These will remain on your device
                until they expire, or you delete them from your cache.
              </li>
              <li>
                Strictly necessary cookies — these cookies are essential for you
                to be able to navigate our Site and use its features. Without
                these cookies, the Site features and services you have asked for
                could not be provided.
              </li>
              <li>
                Performance cookies — these cookies collect information about
                how you use our Site, e.g. which pages you go to most often.
                These cookies do not collect personally identifiable information
                about you. All information collected by these cookies is
                aggregated and anonymous, and is only used to improve how our
                Site works.
              </li>
              <li>
                Functionality cookies — these cookies allow our Site to remember
                the choices you make (such as your user name, language, last
                action and search preferences) and provide enhanced, more
                personal features. The information collected by these cookies is
                anonymous and cannot track your browsing activity on other
                websites.
              </li>
            </ul>
            <h2>The cookies we use</h2>
            <p>
              The table below provides more information about the cookies we use
              and why:
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Cookie name</th>
                  <th>First or Third Party</th>
                  <th>Legal basis for processing</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Third Party</td>
                  <td>
                    <h5>Performance cookie</h5>
                    <p>
                      These cookies are used to collect information about how
                      visitors use our website. We use the information to
                      compile reports and to help us improve the website. The
                      cookies collect information in an anonymous form,
                      including the number of visitors to the website and blog,
                      where visitors have come to the website from and the pages
                      they visited. Read Google's overview of privacy and
                      safeguarding data here.
                    </p>
                  </td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>mp_*</td>
                  <td>Third Party</td>
                  <td>
                    <h5>Performance cookie</h5>
                    <p>
                      These cookies are used to collect information about how
                      visitors use our website. We use the information to
                      compile reports and to help us improve the website. The
                      cookies collect information in an anonymous form,
                      including the number of visitors to the website and blog,
                      where visitors have come to the website from and the pages
                      they visited.
                    </p>
                  </td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>intercom_session-*</td>
                  <td>Third Party</td>
                  <td>
                    <h5>Functionality cookie</h5>
                    <p>
                      There cookies are used to provide the customer support,
                      and authenticate you with the system we use for this.
                    </p>
                  </td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>_producthunt_session</td>
                  <td>Third Party</td>
                  <td>
                    <h5>Performance cookie</h5>
                    <p>
                      These cookies are used to collect information about how
                      visitors use our website. We use the information to
                      compile reports and to help us improve the website. The
                      cookies collect information in an anonymous form,
                      including the number of visitors to the website and blog,
                      where visitors have come to the website from and the pages
                      they visited.
                    </p>
                  </td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>ajs_*</td>
                  <td>Third Party</td>
                  <td>
                    <h5>Functionality cookie</h5>
                    <p>
                      There cookies are used to provide the customer support,
                      and authenticate you with the system we use for this.
                    </p>
                  </td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>
            <h2>Other technologies we use in email marketing</h2>
            <p>
              We also use pixels or web beacons in direct marketing emails that
              we send to you. These pixels track whether our email was delivered
              and opened and whether links within the email were clicked. They
              also allow us to collect information such as your IP address,
              browser, email client type and other similar details. We use this
              information to measure the performance of our email campaigns, and
              for analytics.
            </p>
            <p>
              You can always opt-out of our marketing communications by using
              the unsubscribe link located at the bottom of our email
              communications or you can email us at{" "}
              <a href={API_ROUTES.MAIL_TO_CONTACT}>contact@deepreview.eu</a>.
            </p>
            <h2>Consent to use cookies</h2>
            <p>
              We will ask for your permission (consent) to place cookies or
              other similar tracking technologies on your device, except where
              these are essential for us to provide you with a service that you
              have requested.
            </p>
            <p>
              There is a notice on our home page which describes how we use
              cookies and requests your consent before we place any
              non-essential cookies on your device.
            </p>
            <h2>How to turn off cookies</h2>
            <p>
              If you do not want to accept cookies, you can change your browser
              settings so that cookies are not accepted. If you do this, please
              be aware that you may lose some of the functionality of our Site.
            </p>
            <h2>Updates to this Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal or regulatory reasons.
            </p>
            <p>
              The date at the bottom of this Cookie Policy indicates when it was
              last updated.
            </p>
            <h2>Contact</h2>
            <p>
              If you have questions or concerns regarding our use of cookies or
              other similar tracking technologies you can contact us at{" "}
              <a href={API_ROUTES.MAIL_TO_CONTACT}>contact@deepreview.eu</a>.
            </p>
            <p>This policy was last updated on: 5th February 2023</p>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
