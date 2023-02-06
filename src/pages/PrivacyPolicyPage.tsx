import { API_ROUTES } from "..";
import { Footer } from "../components/common/Footer";
import { NavbarMin } from "../components/common/NavbarMin";
import { SubscribeFrom } from "../components/subscribe/SubscribeForm";

export const PrivacyPolicyPage = () => {
  return (
    <div className="main-body">
      <NavbarMin />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h1>Privacy Policy</h1>
            <p>
              DeepReview (<b>“DeepReview</b>, <b>"we"</b>, <b>"our"</b>, or{" "}
              <b>"us"</b>) is committed to protecting and respecting your
              privacy.
            </p>
            <h2>Our approach to privacy</h2>
            <p>
              This privacy policy sets out how we collect, use and share data
              that identifies or is associated with you ("personal information")
              as a result of you using our website at{" "}
              <a href={API_ROUTES.HOME}>https://deepreview.eu</a> (the "Site")
              or otherwise interacting with us (whether online or offline).
            </p>
            <h2>About us</h2>
            <p>
              DeepReview is the data controller of the personal information we
              hold about you.
            </p>
            <p>
              If you have any questions about this policy or our approach to
              privacy you can contact us at{" "}
              <a href={API_ROUTES.MAIL_TO_CONTACT}>contact@deepreview.eu</a>
            </p>
            <h2>Personal information we collect about you and how we use it</h2>
            <p>
              The table at Annex 1 sets out the categories of personal
              information we collect about you and the purposes for which we use
              that information. The table also lists the legal bases which we
              rely on to process your personal information.
            </p>
            <p>More generally, we:</p>
            <ul>
              <li>
                collect personal information that you voluntarily submit to us,
                such as your name and contact details, when you request access
                to our services, or otherwise interact with us;
              </li>
              <li>
                may require you to provide certain personal information in order
                for us to provide you with our services; and
              </li>
              <li>
                automatically collect personal information indirectly about how
                you access and use the Site (such as the pages you visit), as
                well as information about the device you use to access the Site.
              </li>
            </ul>
            <p>
              We use this information to correspond with you, perform our
              agreements with you, carry out marketing activities and our other
              day-to-day business activities and operations.
            </p>
            <p>
              We may link or combine the personal information we collect about
              you and the information we collect automatically. This allows us
              to provide you with a personalised experience regardless of how
              you interact with us.
            </p>
            <p>
              We will indicate to you where the provision of certain personal
              information is required in order for us to provide you with
              certain features of the Site. If you choose not to provide such
              personal information, we may not be able to provide you with
              access to certain aspects of the Site.
            </p>
            <h2>Anonymous data</h2>
            <p>
              We may anonymise and aggregate any of the personal information we
              collect (so that it does not directly identify you). We may use
              anonymised information for purposes that include testing our IT
              systems, research, data analysis, improving our Sites and
              developing new products and features. We may also share such
              anonymised information with others.
            </p>
            <h2>Data retention</h2>
            <p>
              We will store the personal information we collect about you for no
              longer than necessary for the purposes set out in Annex 1 in
              accordance with our legal obligations and legitimate business
              interests.
            </p>
            <p>
              To determine the appropriate retention period for personal
              information, we consider the amount, nature and sensitivity of the
              personal information, the potential risk of harm from unauthorised
              use or disclosure of your personal information, the purposes for
              which we process your personal information and whether we can
              achieve those purposes through other means, and the applicable
              legal, regulatory, tax, accounting or other requirements.
            </p>
            <p>
              Note that you can delete your account at any time. If you choose
              to do so, this will remove your account page from our systems and
              our related software. We guarantee this will delete all stored
              data.
            </p>
            <h2>Recipients of personal information</h2>
            <p>
              We may also share your personal information with the following (as
              required in accordance with the uses set out in Annex 1 :
            </p>
            <ul>
              <li>
                Service providers: we may share your personal information with
                third party vendors and other service providers that perform
                services for us or on our behalf, which may include providing
                data hosting, customer relationship management and analytics
                services.
              </li>
              <li>
                Other members of the DeepReview group: we may share your
                personal information with our affiliates (for example, where
                they provide services on our behalf) or where such sharing is
                otherwise necessary in accordance with the uses set out in Annex
                1.
              </li>
            </ul>
            <p>
              In addition, we may share your personal information with other
              third parties if you have provided your consent for us to do so.
            </p>
            <h2>Marketing and advertising</h2>
            <p>
              From time to time we may contact you with information about
              DeepReview, including for the purposes of sending you marketing
              messages and asking for your feedback.
            </p>
            <p>
              Most marketing messages (including newsletters) we send will be by
              email. For some marketing messages, we may use personal
              information we collect about you to help us determine the most
              relevant marketing information to share with you.
            </p>
            <p>
              We will only send you marketing messages if you have given us your
              consent to do so, unless consent is not required under applicable
              law (e.g. in certain circumstances where we have a pre-existing
              customer relationship with you).
            </p>
            <p>
              You can withdraw your consent or opt out of receiving further
              communications at a later date by emailing{" "}
              <a href={API_ROUTES.MAIL_TO_CONTACT}>contact@deepreview.eu</a>
            </p>
            <h2>Cookies and similar technologies</h2>
            <p>
              We use cookies and similar technologies on the Site for various
              purposes, including improving your experience of the Site. For
              more information about cookies and why we use these, please refer
              to our <a href={API_ROUTES.COOKIE_POLICY}>Cookies Policy</a>.
            </p>
            <h2>Links to third party sites</h2>
            <p>
              The Site may, from time to time, contain links to and from third
              party websites. If you follow a link to any of these websites,
              please note that these websites have their own privacy policies
              and that we do not accept any responsibility or liability for
              their policies. Please check the individual policies before you
              submit any information to those websites.
            </p>
            <h2>Children</h2>
            <p>
              The Site is not intended for or directed at children under the age
              of 13 years and we do not knowingly collect information relating
              to children under this age.
            </p>
            <h2>Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time and so you
              should review this page periodically. When we change this privacy
              policy in a material way, we will update the "last modified" date
              at the end of this privacy policy. Changes to this privacy policy
              are effective when they are posted on this page.
            </p>
            <p>
              This privacy policy was last modified on the 05th February 2023.
            </p>
            <h2>Annex 1 - Personal information we collect</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Category of personal information</th>
                  <th>How we use it</th>
                  <th>Legal basis for processing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contact details (such as email address)</td>
                  <td>
                    Provision of customer support and to administer the Site
                    (including troubleshooting and resolving technical issues)
                    and marketing operations.
                  </td>
                  <td>
                    It is necessary in our legitimate interests, namely to
                    ensure we are able to resolve any issues you have in
                    accessing the Site or using our services.
                  </td>
                </tr>
                <tr>
                  <td>
                    Technical information (such as browser type, IP address
                    etc.).
                  </td>
                  <td>
                    For operational reasons, such as improving efficiency,
                    training and quality control.
                  </td>
                  <td>
                    It is in our legitimate interests to be as efficient as we
                    can so we deliver the best service for you.
                  </td>
                </tr>
                <tr>
                  <td>
                    Contact details (such as email address), marketing and
                    communications data (such as marketing consents and other
                    information you provide us)
                  </td>
                  <td>
                    Marketing and advertising (including sending you newsletters
                    and measuring the effectiveness of our marketing).
                  </td>
                  <td>
                    <ul>
                      <li>Consent (if required under applicable law).</li>
                      <li>
                        If consent is not required under applicable law, such
                        processing is necessary in our legitimate interests to
                        develop and grow our business.
                      </li>
                      <li>
                        You have the right to opt out of receiving direct
                        marketing communications from us at any time by
                        contacting us at{" "}
                        <a href={API_ROUTES.MAIL_TO_CONTACT}>
                          contact@deepreview.eu
                        </a>
                        .
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    Technical information (such as browser type, IP address
                    etc.) and usage data (pages you viewed and searched for,
                    length of visits to certain pages etc.)
                  </td>
                  <td>
                    <ul>
                      <li>
                        To administer the Site, including resolving technical
                        issues, troubleshooting, data analysis, testing and
                        research and statistical purposes.
                      </li>
                      <li>
                        To ascertain your preferences and improve the Site to
                        ensure that content is presented in the most effective
                        manner for you.
                      </li>
                      <li>Analytics</li>
                    </ul>
                  </td>
                  <td>
                    It is in our legitimate interests to monitor the website to
                    ensure that it functions properly and is secure.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
