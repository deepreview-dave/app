import { Analytics } from "../../business/analytics";
import {
  ControlStep,
  useControlPanelState,
} from "../../state/control-panel.state";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import saveAs from "file-saver";
import { delay } from "../../utils/delay";

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
  // https://stackoverflow.com/questions/44989119/generating-a-pdf-file-from-react-components
  // https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
  const onDownloadClick = async () => {
    state.setDownloading(true);
    await delay(250); // add a bit of a delay
    Analytics.download();
    const input = document.getElementById("pdf-to-download")!;
    const originalWidth = input.scrollWidth;
    const originalHeight = input.scrollHeight;
    input.style.width = "210mm";
    input.style.height = "297mm";
    html2canvas(input).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveAs(blob!, props.fileName);
        input.style.width = originalWidth + "px";
        input.style.height = originalHeight + "px";
        state.setDownloading(false);
      });
    });
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
