import { FormEvent } from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

import { PerformanceScore } from './smarts';
import { useAppState } from './state/state';

const App = () => {

  const answer = useAppState(state => state.answer);
  const inputEnabled = useAppState(state => state.inputEnabled);
  const reviewedPerformanceScore = useAppState(state => state.reviewedPerformanceScore);
  const reviewedName = useAppState(state => state.reviewedName);

  const updateName = useAppState(state => state.updateName);
  const updatePerformanceScore = useAppState(state => state.updatePerformanceScore);
  const generateAnswer = useAppState(state => state.generateAnswer);

  const onNameInputChange = (e: FormEvent<HTMLInputElement>) => updateName(e.currentTarget.value);
  const onSubmit = async () => await generateAnswer(reviewedName, reviewedPerformanceScore);
  const isButtonDisabled = reviewedName.trim() === '';

  return (
    <div className='main-body'>
      <Navbar />
      <div className='layout m-4'>
        <div className='container narrow-container mt-6'>
          <div className='card'>
            <div className='card-content'>
              <div className='content'>
                <div className="field">
                  <label className="label">Person name:</label>
                  <div className="control">
                    <input type="text" className="input" required disabled={!inputEnabled} value={reviewedName} placeholder="Write a person's name here" onChange={onNameInputChange}></input>
                  </div>
                </div>

                <div className='field'>
                  <label className='label'>Peformance score:</label>
                  <div className='select'>
                    <select required onChange={(e) => updatePerformanceScore(e.target.value as PerformanceScore)}>
                      <option value={PerformanceScore.BELOW_EXPECTATIONS}>Below expectations</option>
                      <option value={PerformanceScore.MEETS_EXPECTATIONS} selected>Meets expectations</option>
                      <option value={PerformanceScore.ABOVE_EXPECTATIONS}>Above expectations</option>
                    </select>
                  </div>
                </div>

                <div className="control pt-4">
                  <button className="button is-link is-fullwidth" disabled={isButtonDisabled} onClick={onSubmit}>Generate</button>
                </div>
              </div>
            </div>

          </div>

          <div className="message mt-6">
            <div className="message-header">
              <p>Your review</p>
            </div>
            <div className="message-body">
              {answer}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;
