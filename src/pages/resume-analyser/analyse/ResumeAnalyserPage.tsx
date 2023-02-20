import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../..";
import { Analytics, AnalyticsToolName } from "../../../business/analytics";
import { ResumeAnalyserService } from "../../../business/resume-analyser.service";
import { ResumeAnalyserBreadcrumbs } from "../../../components/common/Breadcrumbs";
import { Footer } from "../../../components/common/Footer";
import { NavbarMin } from "../../../components/common/NavbarMin";
import { SubscribeFrom } from "../../../components/subscribe/SubscribeForm";
import {
  useResumeAnalyserState,
  useResumePrepareState,
} from "../../../state/resume-analyser.state";
import {
  useResumeDetailsState,
  useResumeEducationHistoryState,
  useResumeSummaryState,
  useResumeWorkHistoryState,
} from "../../../state/resume.state";
import { ResumeUploader } from "./ResumeUploader";

export const ResumeAnalyserPage = () => {
  const navigate = useNavigate();
  const state = useResumeAnalyserState((state) => state);
  const setDetailsData = useResumeDetailsState((state) => state.setData);
  const setSummaryData = useResumeSummaryState((state) => state.setData);
  const setWorkData = useResumeWorkHistoryState((state) => state.setData);
  const setEducationData = useResumeEducationHistoryState(
    (state) => state.setData
  );
  const prepState = useResumePrepareState((state) => state);

  useEffect(() => {
    Analytics.tool(AnalyticsToolName.RESUME_ANALYSER);

    setTimeout(async () => {
      if (state.file) {
        await startAnalysis();
      }
    }, 0);
  }, []);

  const InfoText = () => {
    if (!state.file) {
      return (
        <p>
          Already have a resume? Upload the PDF and DeepReview will analyse it
          and suggest improvements.
        </p>
      );
    }

    return (
      <p>
        Hold tight while we analyse your resume: <b>{state.file?.name}</b>.
      </p>
    );
  };

  const startAnalysis = async () => {
    state.setLoading(true);
    const service = new ResumeAnalyserService();

    try {
      const output = await service.analyseResume(state.file!);
      setDetailsData(output);
      setSummaryData(output);
      setWorkData(output);
      setEducationData(output);
      prepState.setIsPrepared();
      state.setResume(output);
      navigate(API_ROUTES.AUTO_REVIEW_RESUME_PREP);
    } catch (e: any) {
      state.setError(e.message);
    }

    state.setLoading(false);
  };

  return (
    <div className="main-body">
      <NavbarMin />
      <ResumeAnalyserBreadcrumbs />
      <div className="layout m-4 mt-6">
        <div className="container">
          <div className="content">
            <h3>Resume Analyser</h3>
            <InfoText />
          </div>
          {!state.isLoading && (
            <>
              <ResumeUploader />
              <div className="mt-4">
                <button
                  onClick={startAnalysis}
                  disabled={!state.file}
                  className="button is-primary"
                >
                  Analyse & Improve
                </button>
              </div>
            </>
          )}
          {state.isLoading && (
            <div className="mt-4">
              <progress className="progress is-small is-primary" max="100">
                15%
              </progress>
            </div>
          )}
          {!!state.error && (
            <article className="message is-danger mt-2">
              <div className="message-header">
                <p>Error</p>
              </div>
              <div className="message-body">{state.error}</div>
            </article>
          )}
        </div>
      </div>
      <SubscribeFrom />
      <Footer />
    </div>
  );
};
