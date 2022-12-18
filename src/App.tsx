import React, {MouseEvent, FormEvent} from 'react';
import './App.css';

import {getSomeData, PerformanceScore} from './smarts';

enum AppStatus {
   LOADING = 'loading',
   STABLE = 'stable'
}

interface AppProps {
}

interface AppState {
    status: AppStatus;
    inputError: string|null;
    inputEnabled: boolean;
    reviewedName: string;
    reviewedPerformanceScore: PerformanceScore;
    answer: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
        status: AppStatus.STABLE,
        inputError: null,
        inputEnabled: true,
        reviewedName: '',
        reviewedPerformanceScore: PerformanceScore.MEETS_EXPECTATIONS,
        answer: '<Press "Generate" to generate a review>'
    };

    // Is this still needed in 2022?
    this.handleReviewedNameChange = this.handleReviewedNameChange.bind(this);
    this.handleReviewedPerformanceScoreChanged = this.handleReviewedPerformanceScoreChanged.bind(this);
    this.getNewAnswer = this.getNewAnswer.bind(this);
  }

  async handleReviewedNameChange(e: FormEvent<HTMLInputElement>) {
    const newReviewedName = e.currentTarget.value;
    this.setState({...this.state, inputError: null, reviewedName: newReviewedName});
  }

  async handleReviewedPerformanceScoreChanged(newPerformanceScore: PerformanceScore) {
    this.setState({...this.state, inputError: null, reviewedPerformanceScore: newPerformanceScore});
  }

  async getNewAnswer(e: MouseEvent) {
    e.preventDefault();

    // Input validation.
    const reviewedName = this.state.reviewedName.trim();
    if (reviewedName === "") {
        this.setState({...this.state, inputError: 'Name is empty'});
        return;
    }

    this.setState({...this.state, status: AppStatus.LOADING, inputEnabled: this.isInputDisabled()});

    const response = await getSomeData({
        name: reviewedName,
        performanceScore: this.state.reviewedPerformanceScore
    });

    if (response !== undefined) {
        this.setState({status: AppStatus.STABLE, inputEnabled: this.isInputDisabled(), reviewedName: '', answer: response});
    } else {
        this.setState({status: AppStatus.STABLE, inputEnabled: this.isInputDisabled(), reviewedName: '', answer: 'An error occurred!'});
    }
  }

  render() {
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
                    <input type="text" className="input" required disabled={!this.state.inputEnabled} value={this.state.reviewedName} placeholder="Write a person's name here" onChange={this.handleReviewedNameChange}></input>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Performance Score: </label>
                  <div className="control">
                    <label className="radio">
                      <input
                        type="radio"
                        checked={this.state.reviewedPerformanceScore === PerformanceScore.BELOW_EXPECTATIONS}
                        disabled={!this.state.inputEnabled}
                        onChange={() => this.handleReviewedPerformanceScoreChanged(PerformanceScore.BELOW_EXPECTATIONS)} />
                      Below Expectations
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        checked={this.state.reviewedPerformanceScore === PerformanceScore.MEETS_EXPECTATIONS}
                        disabled={!this.state.inputEnabled}
                        onChange={() => this.handleReviewedPerformanceScoreChanged(PerformanceScore.MEETS_EXPECTATIONS)} />
                      Meets Expectations
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        checked={this.state.reviewedPerformanceScore === PerformanceScore.ABOVE_EXPECTATIONS}
                        disabled={!this.state.inputEnabled}
                        onChange={() => this.handleReviewedPerformanceScoreChanged(PerformanceScore.ABOVE_EXPECTATIONS)} />
                      Above Expectations
                    </label>
                  </div>
                </div>

                <div className="control">
                  <button className="button is-link is-fullwidth" disabled={!this.state.inputEnabled} onClick={this.getNewAnswer}>Generate</button>
                </div>
              </form>

            </section>

            {this.state.inputError &&
            <section className="section">
              <div className="message is-danger">
                <div className="message-header">
                  <p>Input Error</p>
                </div>
                <div className="message-body">
                  {this.state.inputError}
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
                  {this.state.answer}
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
      );
  }

  isInputDisabled(): boolean {
    return this.state.status === AppStatus.LOADING;
  }
}

export default App;
