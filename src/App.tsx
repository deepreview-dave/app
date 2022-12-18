import React, {MouseEvent, FormEvent} from 'react';
import './App.css';

import {getSomeData} from './smarts';

enum AppStatus {
   LOADING = 'loading',
   STABLE = 'stable'
}

interface AppProps {
}

interface AppState {
    status: AppStatus;
    inputEnabled: boolean;
    prompt: string;
    answer: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
        status: AppStatus.STABLE,
        inputEnabled: true,
        prompt: '',
        answer: '<Press "Generate" to generate a review>'
    };

    // Is this still needed in 2022?
    this.handlePromptChange = this.handlePromptChange.bind(this);
    this.getNewPrompt = this.getNewPrompt.bind(this);
  }

  async handlePromptChange(e: FormEvent<HTMLInputElement>) {
    const newPrompt = e.currentTarget.value;
    this.setState({...this.state, prompt: newPrompt});
  }

  async getNewPrompt(e: MouseEvent) {
    e.preventDefault();
    this.setState({...this.state, status: AppStatus.LOADING, inputEnabled: this.isInputDisabled()});

    const response = await getSomeData(this.state.prompt);

    if (response !== undefined) {
        this.setState({status: AppStatus.STABLE, inputEnabled: this.isInputDisabled(), prompt: '', answer: response});
    } else {
        this.setState({status: AppStatus.STABLE, inputEnabled: this.isInputDisabled(), prompt: '', answer: 'An error occurred!'});
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
                  <label className="label">Prompt: </label>
                  <div className="control">
                    <input type="text" className="input" disabled={!this.state.inputEnabled} value={this.state.prompt} placeholder="Write a prompt here" onChange={this.handlePromptChange}></input>
                  </div>
                </div>

                <div className="control">
                  <button className="button is-link is-fullwidth" disabled={!this.state.inputEnabled} onClick={this.getNewPrompt}>Generate</button>
                </div>
              </form>

            </section>

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
