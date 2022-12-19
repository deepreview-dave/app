import { FormEvent } from 'react';
import './App.css';

import { PerformanceScore } from './smarts';
import { useAppState } from './state/state';

const App = () => {

  const answer = useAppState(state => state.answer);
  const inputError = useAppState(state => state.inputError);
  const inputEnabled = useAppState(state => state.inputEnabled);
  const reviewedPerformanceScore = useAppState(state => state.reviewedPerformanceScore);
  const reviewedName = useAppState(state => state.reviewedName);

  const setError = useAppState(state => state.setError);
  const updateName = useAppState(state => state.updateName);
  const updatePerformanceScore = useAppState(state => state.updatePerformanceScore);
  const generateAnswer = useAppState(state => state.generateAnswer);

  const onNameInputChange = (e: FormEvent<HTMLInputElement>) => updateName(e.currentTarget.value);

  const onSubmit = async () => {
    const name = reviewedName.trim();
    if (name === "") {
      setError('Name is empty');
      return;
    }
    await generateAnswer(reviewedName, reviewedPerformanceScore);
  }

  return (
    <div>

      <section className="hero is-medium is-primary">

        <div className="hero-body">
          <p className="title">
            Auto Perf Review
          </p>
          <p className="subtitle">
            Take the drudgery out of performance reviews!
          </p>
        </div>

      </section>

      <section className="section">

        <form>
          <div className="field">
            <label className="label">Person's Name: </label>
            <div className="control">
              <input type="text" className="input" required disabled={!inputEnabled} value={reviewedName} placeholder="Write a person's name here" onChange={onNameInputChange}></input>
            </div>
          </div>

          <div className="field">
            <label className="label">Performance Score: </label>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  checked={reviewedPerformanceScore === PerformanceScore.BELOW_EXPECTATIONS}
                  disabled={!inputEnabled}
                  onChange={() => updatePerformanceScore(PerformanceScore.BELOW_EXPECTATIONS)} />
                Below Expectations
              </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={reviewedPerformanceScore === PerformanceScore.MEETS_EXPECTATIONS}
                  disabled={!inputEnabled}
                  onChange={() => updatePerformanceScore(PerformanceScore.MEETS_EXPECTATIONS)} />
                Meets Expectations
              </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={reviewedPerformanceScore === PerformanceScore.ABOVE_EXPECTATIONS}
                  disabled={!inputEnabled}
                  onChange={() => updatePerformanceScore(PerformanceScore.ABOVE_EXPECTATIONS)} />
                Above Expectations
              </label>
            </div>
          </div>

          <div className="control">
            <button className="button is-link is-fullwidth" disabled={!inputEnabled} onClick={onSubmit}>Generate</button>
          </div>
        </form>

      </section>

      {inputError &&
        <section className="section">
          <div className="message is-danger">
            <div className="message-header">
              <p>Input Error</p>
            </div>
            <div className="message-body">
              {inputError}
            </div>
          </div>
        </section>
      }

      <section className="section">

        <div className="message">
          <div className="message-header">
            <p>Your review</p>
          </div>
          <div className="message-body">
            {answer}
          </div>
        </div>

      </section>

      <section className="footer">

        <div className="content has-text-centered">
          <p>
            <strong>Auto Perf Review</strong>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            With tasteful tracking.
          </p>
        </div>

      </section>

    </div>
  )
}

export default App;
