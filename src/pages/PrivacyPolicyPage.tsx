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
              <a href="mailto:contact@deepreview.eu">contact@deepreview.eu</a>
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
          </div>
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
