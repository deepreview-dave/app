import saveAs from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Analytics } from "../../../business/analytics";
import {
  isValidEducationHistory,
  isValidWorkHistory,
  useResumeDetailsState,
  useResumeEducationHistoryState,
  useResumeSummaryState,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";

const Separator = () => {
  return <span className="mr-2 ml-2">|</span>;
};

export const ResumeResult = () => {
  const ResumeDetails = () => {
    const details = useResumeDetailsState((state) => state);

    const Name = () => {
      if (!details.name) {
        return (
          <span className="has-background-warning has-text-warning-dark">
            [Your Name]
          </span>
        );
      } else {
        return <span>{details.name}</span>;
      }
    };

    return (
      <>
        <h2>
          <Name />
        </h2>
        <hr />
      </>
    );
  };

  const ResumeInfo = () => {
    const details = useResumeDetailsState((state) => state);

    const Address = () => {
      const Item = () => {
        if (!details.address) {
          return (
            <span className="has-background-warning has-text-warning-dark">
              [N/A]
            </span>
          );
        } else {
          return <span>{details.address}</span>;
        }
      };

      return (
        <span>
          <small>
            Address:{" "}
            <b>
              <Item />
            </b>
          </small>
        </span>
      );
    };
    const Phone = () => {
      const Item = () => {
        if (!details.phone) {
          return (
            <span className="has-background-warning has-text-warning-dark">
              [N/A]
            </span>
          );
        } else {
          return <span>{details.phone}</span>;
        }
      };

      return (
        <span>
          <small>
            Phone:{" "}
            <b>
              <Item />
            </b>
          </small>
        </span>
      );
    };
    const Email = () => {
      const Item = () => {
        if (!details.email) {
          return (
            <span className="has-background-warning has-text-warning-dark">
              [N/A]
            </span>
          );
        } else {
          return <span>{details.email}</span>;
        }
      };

      return (
        <span>
          <small>
            Email:{" "}
            <b>
              <Item />
            </b>
          </small>
        </span>
      );
    };
    return (
      <div>
        <Address />
        <Separator />
        <Phone />
        <Separator />
        <Email />
      </div>
    );
  };

  const SummaryInfo = () => {
    const summary = useResumeSummaryState((state) => state);
    const Info = () => {
      if (summary.result.length === 0) {
        return (
          <p>
            <span className="has-background-warning has-text-warning-dark">
              [N/A]
            </span>
          </p>
        );
      } else {
        return (
          <>
            {summary.result
              .map((e) => e.expanded)
              .map((e) => (
                <p>{e}</p>
              ))}
          </>
        );
      }
    };

    return (
      <div className="mt-6">
        <h4>Summary</h4>
        <Info />
      </div>
    );
  };

  const WorkHistoryInfo = () => {
    const work = useResumeWorkHistoryState((state) => state);
    const validItems = work.items.filter((e) => isValidWorkHistory(e));

    if (validItems.length === 0) {
      return (
        <div className="mt-6">
          <h4>Experience</h4>
          <span className="has-background-warning has-text-warning-dark">
            [N/A]
          </span>
        </div>
      );
    }

    const History = () => {
      return (
        <div>
          {validItems.map((e) => (
            <>
              <p>
                <span>
                  <b>{e.role}</b>
                </span>
                <Separator />
                <span>
                  <b>{e.company}</b>
                </span>
                <Separator />
                <span>
                  <b>
                    {e.start} - {e.end}
                  </b>
                </span>
              </p>
              {e.results
                .filter((i) => i.editable)
                .map((i) => i.expanded)
                .map((i) => (
                  <p>{i}</p>
                ))}
              {e.results.length === 0 && (
                <p>
                  <span className="has-background-warning has-text-warning-dark">
                    [N/A]
                  </span>
                </p>
              )}
            </>
          ))}
        </div>
      );
    };

    return (
      <div className="mt-6">
        <h4>Experience</h4>
        <History />
      </div>
    );
  };

  const EducationHistoryInfo = () => {
    const education = useResumeEducationHistoryState((state) => state);
    const validItems = education.items.filter((e) =>
      isValidEducationHistory(e)
    );

    if (validItems.length === 0) {
      return (
        <div className="mt-6">
          <h4>Education</h4>
          <span className="has-background-warning has-text-warning-dark">
            [N/A]
          </span>
        </div>
      );
    }

    const History = () => {
      return (
        <div>
          {validItems.map((e) => (
            <>
              <p>
                <span>
                  <b>{e.school}</b>
                </span>
                <Separator />
                <span>
                  <b>{e.degree}</b>
                </span>
                <Separator />
                <span>
                  <b>
                    {e.start} - {e.end}
                  </b>
                </span>
              </p>
              {e.results
                .filter((i) => i.editable)
                .map((i) => i.expanded)
                .map((i) => (
                  <p>{i}</p>
                ))}
            </>
          ))}
        </div>
      );
    };

    return (
      <div className="mt-6">
        <h4>Education</h4>
        <History />
      </div>
    );
  };

  // from here:
  // https://stackoverflow.com/questions/44989119/generating-a-pdf-file-from-react-components
  // https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
  const onDownloadClick = () => {
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
      });
    });
  };

  return (
    <>
      <div className="has-background-white-ter">
        <div id="pdf-to-download" className="result-display">
          <div className="has-background-info p-2"></div>
          <div className="p-4 has-background-white content">
            <ResumeDetails />
            <ResumeInfo />
            <SummaryInfo />
            <WorkHistoryInfo />
            <EducationHistoryInfo />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="button" onClick={onDownloadClick}>
          Download
        </button>
      </div>
    </>
  );
};
