import React from "react";
import {
  Router,
  RouteComponentProps,
  Redirect,
  globalHistory
} from "@reach/router";
import PageLogin from "./components/page-login";

// import LeaderLoginPost from "./components/leader-login-post";
// import LeaderLandingPage, {
//   LeaderExperienceSurvey
// } from "./components/leader-pages";
// import { ExperienceSurveyPreStart } from "./components/leader-pages/experience-survey";
// import { PageRegister } from "./components/page-register";
// import PageRegisterMul from "./components/page-register-mul";
// import { IntlProvider, addLocaleData } from "react-intl";
// import locale_en from "react-intl/locale-data/en";
// import locale_ko from "react-intl/locale-data/ko";
// import locale_zh from "react-intl/locale-data/zh";
// import locale_fr from "react-intl/locale-data/fr";
// import locale_it from "react-intl/locale-data/it";
// import localeData from "./locale-data/locales/intl.json";
// import DatePickerProvider from "./components/date-picker/DatePicker";
// import LoggedOutRoute from "./components/logged-out-route/LoggedOutRoute";
// import { ProtectedRoute } from "./components/protected-route";
// import PageDashboard from "./components/page-dashboard";
// import PageInsights from "./components/page-insights";
import ResponsiveLayout from "./components/responsive-layout/ResponsiveLayout";
// import PageProfiles from "./components/page-profiles/PageProfiles";
// import PageProfileView from "./components/page-view-profile/PageViewProfile";
import useAuthContext from "./hooks/useAuthContext";
//import useLocaleContext from "./hooks/useLocaleContext";
// import PageCreateProfile from "./components/page-create-profile";
//import PageSelectChallenges from "./components/page-select-challenges/PageSelectChallenges";
import { CssBaseline } from "@material-ui/core";
// import PageEditProfile, {
//   IPageEditProfileProps
// } from "./components/page-edit-profile/PageEditProfile";
//import { PagePeople } from "./components/page-people";
//import PageSendResetPassword from "./components/page-send-reset-password";
//import SendRegistrationMail from "./components/page-send-registration-mail";
//import PageResetPassword from "./components/page-reset-password";
//import PageCreateInsight from "./components/page-create-insight";
//import PageViewInsight from "./components/page-view-insight";
import { QueryParamProvider } from "use-query-params";
import { Permission } from "./components/auth-context-provider";
//import PageDevelopmentPlan from "./components/page-development-plan";
//import LeaderDevelopmentPlan from "./components/leader-pages/LeaderDevelopmentPlan";
//import { PageInterviewGuideBuilder } from "./components/page-interview-guide-builder";
//import { PageResources } from "./components/page-resources/PageResources";
import { routes } from "./utils";
import { FocusRole, ChosenView } from "./types";
//import { PageSubscriptions } from "./components/page-subscriptions";
//import { LeaderTabs } from "./components/leader-pages/LeaderLandingTabs";
//import { LeaderFaqPage } from "./components/leader-pages/LeaderFaqPage";
//import { LeaderWelcomePage } from "./components/leader-pages/LeaderWelcomePage";
//import { PageWelcome } from "./components/page-welcome/PageWelcome";

const NotFound = (_: RouteComponentProps) => <Redirect to="/" noThrow />;
export default function App() {
  const isLoggedIn = true;
  return (
    <>
      <CssBaseline />
      <ResponsiveLayout disabled={isLoggedIn}>
        <QueryParamProvider reachHistory={globalHistory}>
          <Router id="router">
            <NotFound default />
            {/* <LoggedOutRoute component={PageRegister} path={routes.register} /> */}
            <div className="App">
              <h1>Hello ABC CodeSandbox</h1>
              <h2>Start editing to see some magic happen!</h2>
            </div>
            {/* <ProtectedRoute
              component={LeaderLoginPost}
              path={routes.leader.loginPost}
              leader={true}
            /> */}
            <PageLogin path={routes.login} />
          </Router>
        </QueryParamProvider>
      </ResponsiveLayout>
    </>
  );
}
