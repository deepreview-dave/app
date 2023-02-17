import { Fragment } from "react";
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
            <b>Address: </b>
            <Item />
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
            <b>Phone: </b>
            <Item />
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
            <b>Email: </b>
            <Item />
          </small>
        </span>
      );
    };
    const Linkedin = () => {
      if (!details.linkedin) {
        return null;
      }

      return (
        <span>
          <small>
            <b>Linkedin: </b>
            <a target={"_blank"} href={details.linkedin}>
              {details.linkedin}
            </a>
          </small>
        </span>
      );
    };
    const Website = () => {
      if (!details.website) {
        return null;
      }

      return (
        <span>
          <small>
            <b>Website: </b>
            <a target={"_blank"} href={details.website}>
              {details.website}
            </a>
          </small>
        </span>
      );
    };
    return (
      <div>
        <div>
          <Address />
          <Separator />
          <Phone />
          <Separator />
          <Email />
        </div>
        {details.linkedin && (
          <div>
            <Linkedin />
          </div>
        )}
        {details.website && (
          <div>
            <Website />
          </div>
        )}
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
              [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.]
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
            [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.]
          </span>
        </div>
      );
    }

    const History = () => {
      return (
        <div>
          {validItems.map((e) => (
            <Fragment key={e.company + "-" + e.role}>
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
                    [Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.]
                  </span>
                </p>
              )}
            </Fragment>
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

  const SkillsInfo = () => {
    const skills = useResumeSummaryState((state) => state.skills);
    if (!skills) {
      return (
        <div className="mt-6">
          <h4>Skills</h4>
          <span className="has-background-warning has-text-warning-dark">
            [Skill 1, Skill 2, Skill 3]
          </span>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h4>Skills</h4>
        <span>{skills}</span>
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
            [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.]
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

  return (
    <div className="has-background-white-ter">
      <div id="pdf-to-download" className="result-display">
        <div className="has-background-info p-2"></div>
        <div className="p-4 has-background-white content">
          <ResumeDetails />
          <ResumeInfo />
          <SummaryInfo />
          <WorkHistoryInfo />
          <SkillsInfo />
          <EducationHistoryInfo />
        </div>
      </div>
    </div>
  );
};
