import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { NameEditor } from './components/NameEditor';
import { PerformanceScoreEditor } from './components/PerformanceScoreEditor';
import { useAppState } from './state/state';

const App = () => {

  const answer = useAppState(state => state.answer);
  const inputEnabled = useAppState(state => state.inputEnabled);
  const reviewedPerformanceScore = useAppState(state => state.reviewedPerformanceScore);
  const reviewedName = useAppState(state => state.reviewedName);

  const generateAnswer = useAppState(state => state.generateAnswer);

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
                <NameEditor />
                <PerformanceScoreEditor />

                <div className="control pt-4">
                  <button className="button is-link is-fullwidth" disabled={isButtonDisabled || !inputEnabled} onClick={onSubmit}>Generate</button>
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
