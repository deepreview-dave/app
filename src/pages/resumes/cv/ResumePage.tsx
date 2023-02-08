import { useEffect, useState } from "react";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { ResultsError } from "../../../components/results/ResultsError";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import { ResumeStep, useResumeState } from "../../../state/resume.state";
import { ResumeDetails } from "./ResumeDetails";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeResult } from "./ResumeResult";
import { ResumeSummary } from "./ResumeSummary";
import { ResumeWorkplaces } from "./ResumeWorkplaces";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import saveAs from "file-saver";
import { delay } from "../../../utils/delay";

export const ResumePage = () => {
  const state = useResumeState((state) => state);
  const isInput = useResumeState((state) => state.step === ResumeStep.Input);
  const isResult = useResumeState((state) => state.step === ResumeStep.Result);
  const [isDownloading, setIsDowloading] = useState(false);

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME);
  }, []);

  const Content = () => {
    return (
      <>
        <ResumeDetails />
        <ResumeSummary />
        <ResumeWorkplaces />
        <ResumeEducation />
        <ResultsError />
      </>
    );
  };

  const ControlPanel = () => {
    // from here:
    // https://stackoverflow.com/questions/44989119/generating-a-pdf-file-from-react-components
    // https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
    const onDownloadClick = async () => {
      setIsDowloading(true);
      await delay(250); // add a bit of a delay
      Analytics.download();
      const input = document.getElementById("pdf-to-download")!;
      const originalWidth = input.scrollWidth;
      const originalHeight = input.scrollHeight;
      input.style.width = "210mm";
      input.style.height = "297mm";
      html2canvas(input).then((canvas) => {
        canvas.toBlob(function (blob) {
          saveAs(blob!, "resume.jpg");
          input.style.width = originalWidth + "px";
          input.style.height = originalHeight + "px";
          setIsDowloading(false);
        });
      });
    };

    return (
      <div>
        <hr />
        <div className="columns is-mobile">
          <div className="column">
            <div className="buttons">
              <button
                className="button is-small"
                disabled
                title="Tutorial (Coming Soon)"
              >
                <span className="icon is-small">
                  <i className="fas fa-question-circle"></i>
                </span>
                <span>Tutorial</span>
              </button>
              <button
                className="button is-small"
                title="Download Result"
                onClick={onDownloadClick}
              >
                <span className="icon is-small">
                  <i className="fas fa-download"></i>
                </span>
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="column is-narrow">
            {isInput && (
              <button
                className="button is-small is-info"
                title="See Preview"
                onClick={() => state.seeResult()}
              >
                <span className="icon is-small">
                  <i className="fas fa-eye"></i>
                </span>
                <span>Preview</span>
              </button>
            )}
            {isResult && (
              <button
                className="button is-small"
                title="Edit Information"
                onClick={() => state.seeInput()}
              >
                <span className="icon is-small">
                  <i className="fas fa-eye"></i>
                </span>
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
        <hr className="mt-0 pt-0" />
      </div>
    );
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Resume</h3>
            <p>
              Fill in each of the sections below individually. At each step,
              click the corresponsing 'Generate' button to let DeepReview create
              a section of your resume.
            </p>
          </div>
          <ControlPanel />
          {isInput && <Content />}
          {(isResult || isDownloading) && <ResumeResult />}
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
