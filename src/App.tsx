import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { NameEditor } from "./components/NameEditor";
import { PerformanceScoreEditor } from "./components/PerformanceScoreEditor";
import { ResultBlock } from "./components/ResultBlock";
import { RoleEditor } from "./components/RoleEditor";
import { DepartmentEditor } from "./components/DepartmentEditor";
import { SubmitControl } from "./components/SubmitControl";
import { ReviewHeader } from "./components/ReviewHeader";
import { MoreAttributes } from "./components/MoreAttributes";

const App = () => {
  return (
    <div className="main-body">
      <Navbar />
      <div className="layout m-4">
        <div className="container narrow-container mt-6">
          <ReviewHeader />
          <div className="card">
            <div className="card-content">
              <div className="content">
                <NameEditor />
                <PerformanceScoreEditor />
                <RoleEditor />
                <DepartmentEditor />
                <MoreAttributes />
                <hr />
                <SubmitControl />
              </div>
            </div>
          </div>
          <ResultBlock />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
