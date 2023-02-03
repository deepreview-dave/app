import { ToolName } from "../../../business/common";
import { useResultState } from "../../../state/result-state";
import {
  useResumeDetailsState,
  useResumeState,
  useResumeSummaryState,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";

export const ResumeResult = () => {
  const result = useResultState((state) => state.results);
  const details = useResumeDetailsState((state) => state);
  const work = useResumeWorkHistoryState((state) => state);

  const ResumeDetails = () => {
    if (!details.name) {
      return (
        <div className="message is-warning">
          <div className="message-body">
            Please enter your <b>Name</b> in the Details section.
          </div>
        </div>
      );
    }

    return (
      <>
        <h2>{details.name}</h2>
        <hr />
      </>
    );
  };

  const ResumeInfo = () => {
    const Address = () => {
      if (!details.address) {
        return (
          <span className="tag is-warning">Please enter your Address</span>
        );
      } else {
        return (
          <span>
            <small>
              Address: <b>{details.address}</b>
            </small>
          </span>
        );
      }
    };
    const Phone = () => {
      if (!details.phone) {
        return <span className="tag is-warning">Please enter your Phone</span>;
      } else {
        return (
          <span>
            <small>
              Phone: <b>{details.phone}</b>
            </small>
          </span>
        );
      }
    };
    const Email = () => {
      if (!details.email) {
        return <span className="tag is-warning">Please enter your Email</span>;
      } else {
        return (
          <span>
            <small>
              Email: <b>{details.email}</b>
            </small>
          </span>
        );
      }
    };
    return (
      <div>
        <Address />
        <span className="mr-2 ml-2">|</span>
        <Phone />
        <span className="mr-2 ml-2">|</span>
        <Email />
      </div>
    );
  };

  const SummaryInfo = () => {
    const Summary = () => {
      const summaries = result.filter(
        (e) => e.tool === ToolName.Resume_Summary
      );

      if (summaries.length === 0) {
        return (
          <div className="message is-warning">
            <div className="message-body">
              Please fill in the <b>Summary</b> section.
            </div>
          </div>
        );
      } else {
        return <p>{summaries.map((e) => e.expanded).join("\n\n")}</p>;
      }
    };

    return (
      <div className="mt-6">
        <h4>Summary</h4>
        <Summary />
      </div>
    );
  };

  const WorkHistoryInfo = () => {
    const History = () => {
      const workSections = result.filter(
        (e) => e.tool === ToolName.Resume_Work && e.editable
      );

      // if (work.result.length === 0) {
      //   return (
      //     <div className="message is-warning">
      //       <div className="message-body">
      //         Please fill in the <b>Work History</b> section.
      //       </div>
      //     </div>
      //   )
      // } else {
      return <div>ABC</div>;
      // }
    };

    return (
      <div className="mt-6">
        <h4>Experience</h4>
        <History />
      </div>
    );
  };

  return (
    <div className="has-background-white-ter p-6">
      <div className="has-background-info p-2"></div>
      <div className="p-4 has-background-white content">
        <ResumeDetails />
        <ResumeInfo />
        <SummaryInfo />
        <WorkHistoryInfo />
      </div>
    </div>
  );
};
