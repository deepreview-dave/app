import ReactDOM from "react-dom/client";
import "./index.sass";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Analytics } from "./business/analytics";
import { HomePage } from "./pages/home/HomePage";
import { SelectPersonaPage } from "./pages/performance-review/SelectPersonaPage";
import { PerformanceReviewPage } from "./pages/performance-review/perf-review/PerformanceReviewPage";
import { CoverLetterPage } from "./pages/resumes/cover/CoverLetterPage";
import { ReferralPage } from "./pages/resumes/referral/ReferralPage";
import { ResumePage } from "./pages/resumes/cv/ResumePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { PraisePage } from "./pages/praise/PraisePage";
import { ResignationLetterPage } from "./pages/resignation-letter/ResignationLetterPrage";
import { CompensationPage } from "./pages/compensation/CompensationPage";
import { ResumeAnalyserPage } from "./pages/resume-analyser/analyse/ResumeAnalyserPage";
import { ResumePrepPage } from "./pages/resume-analyser/prep/ResumePrepPage";

export enum API_ROUTES {
  HOME = "/",
  PERF_REVIEW_PERSONA = "/performance-review/persona",
  PERF_REVIEW_RESULT = "/performance-review/result",
  RESUME_COVER_LETTER = "/resume/cover-letter",
  RESUME_REFERRAL = "/resume/referral-letter",
  PRAISE = "/praise",
  PRIVACY_POLICY = "/privacy-policy",
  COOKIE_POLICY = "/cookie-policy",
  RESIGNATION_LETTER = "/resignation-letter",
  COMPENSATION = "/compensation",
  RESUME_CV = "/resume/cv",
  AUTO_REVIEW_RESUME_ANALYSE = "/auto-review/resume/analyse",
  AUTO_REVIEW_RESUME_PREP = "/auto-review/resume/prep",
  MAIL_TO_CONTACT = "mailto:contact@deepreview.eu",
}

const router = createBrowserRouter([
  {
    path: API_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: API_ROUTES.PERF_REVIEW_PERSONA,
    element: (
      <>
        <SelectPersonaPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.PERF_REVIEW_RESULT,
    element: (
      <>
        <PerformanceReviewPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.RESUME_COVER_LETTER,
    element: (
      <>
        <CoverLetterPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.RESUME_REFERRAL,
    element: (
      <>
        <ReferralPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.RESUME_CV,
    element: (
      <>
        <ResumePage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.PRAISE,
    element: (
      <>
        <PraisePage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.PRIVACY_POLICY,
    element: (
      <>
        <PrivacyPolicyPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.COOKIE_POLICY,
    element: (
      <>
        <CookiePolicyPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.RESIGNATION_LETTER,
    element: (
      <>
        <ResignationLetterPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.COMPENSATION,
    element: (
      <>
        <CompensationPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.AUTO_REVIEW_RESUME_ANALYSE,
    element: (
      <>
        <ResumeAnalyserPage />
        <ScrollRestoration />
      </>
    ),
  },
  {
    path: API_ROUTES.AUTO_REVIEW_RESUME_PREP,
    element: (
      <>
        <ResumePrepPage />
        <ScrollRestoration />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// if you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
Analytics.init(process.env.REACT_APP_MIXPANEL_TOKEN);
