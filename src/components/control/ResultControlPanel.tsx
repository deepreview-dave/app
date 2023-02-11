import {
  ControlStep,
  useControlPanelState,
} from "../../state/control-panel.state";
import { savePDF } from "@progress/kendo-react-pdf";
import { delay } from "../../utils/delay";
import { Analytics } from "../../business/analytics";

export const ResultControlPanel = (props: {
  fileName: string;
  tutorial?: string;
}) => {
  const state = useControlPanelState((state) => state);
  const isEdit = useControlPanelState(
    (state) => state.step === ControlStep.Edit
  );
  const isReview = useControlPanelState(
    (state) => state.step === ControlStep.Review
  );

  // from here:
  // https://wkwok.medium.com/lets-make-a-resume-in-react-2c9c5540f51a
  const onDownloadClick = async () => {
    Analytics.download();
    state.setDownloading(true);
    await delay(150);

    const element = document.getElementById("pdf-to-download")!;

    const originalWidth = element.scrollWidth;
    const originalHeight = element.scrollHeight;
    // set element to A4 size
    element.style.width = "210mm";
    element.style.height = "297mm";

    savePDF(element, {
      paperSize: "auto",
      margin: 20,
      fileName: props.fileName,
    });

    // set element back to its original size
    element.style.width = originalWidth + "px";
    element.style.height = originalHeight + "px";
    state.setDownloading(false);
  };

  const onTutorialClick = () => {
    window.location.href = props.tutorial!;
  };

  return (
    <div>
      <hr />
      <div className="columns is-mobile">
        <div className="column">
          <div className="buttons">
            <button
              className="button is-small"
              disabled={!props.tutorial}
              title={props.tutorial ? "Tutorial" : "Tutorial (Coming Soon)"}
              onClick={onTutorialClick}
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
          {isEdit && (
            <button
              className="button is-small is-info"
              title="See Preview"
              onClick={() => state.seeReview()}
            >
              <span className="icon is-small">
                <i className="fas fa-eye"></i>
              </span>
              <span>Preview</span>
            </button>
          )}
          {isReview && (
            <button
              className="button is-small"
              title="Edit Information"
              onClick={() => state.seeEdit()}
            >
              <span className="icon is-small">
                <i className="fas fa-pen"></i>
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
