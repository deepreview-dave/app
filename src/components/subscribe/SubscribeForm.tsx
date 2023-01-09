import { useState } from "react";
import validator from "validator";

export const SubscribeFrom = () => {
  const [emailInput, updateEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const isButtonDisabled = !emailInput;

  const onSubmit = () => {
    if (!validator.isEmail(emailInput)) {
      setEmailValid(false);
      return;
    }

    setEmailValid(true);
    updateEmail("");
    setSubscribed(true);
    // send data
  };

  return (
    <div className="has-background-info mt-6">
      <div className="layout m-4">
        <div className="container narrow-container">
          <div className="content pt-6 pb-6 has-text-white">
            <h4 className="has-text-white">Subscribe</h4>
            <p>
              If you want to receive updates about the development of{" "}
              <b>DeepReview</b>, please subscribe by entering your email below.
              We will only send relevant product updates, once in a while. We
              will not spam you.
            </p>
            {!subscribed && (
              <div className="columns">
                <div className="column">
                  <input
                    value={emailInput}
                    onChange={(e) => updateEmail(e.currentTarget.value)}
                    className="input is-info"
                    type={"email"}
                    placeholder="Email address"
                  />
                </div>
                <div className="column is-narrow">
                  <button
                    onClick={() => onSubmit()}
                    disabled={isButtonDisabled}
                    className="button"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            )}
            {subscribed && (
              <div className="notification is-link">
                Subscribed successfully!
              </div>
            )}
            {!emailValid && (
              <div className="has-text-warning">
                <b>Please enter a valid email.</b>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
