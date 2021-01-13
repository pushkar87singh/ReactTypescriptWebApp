const strParam = (prefix: string, suffix: string = "") => {
  return (val: string) => `${prefix}/${val}${suffix}`;
};

export const routes = {
  helpCenter:
    "https://support.shl.com/KB_ContactUs?cg=client&l=en_US&p=&pt=&lg=&cg=",

  register: "/register/:registrationCode",
  mulRegister: "/mulregister/:mulToken",
  doRegister: strParam("/register"),
  login: "/login",
  sendResetPassword: "/forgot-password",
  sendRegistrationMail: "/registration-mail",
  resetPassword: "/password/:token",
  doResetPassword: strParam("/password"),

  welcome: "/welcome",

  leader: {
    loginPost: "/login/post",
    loginPostPage: "/login/post/:pageNumber",
    doLoginPostPage: strParam("/login/post"),
    landing: "/landing",
    faqs: "/faqs",
    development: "/development",
    experienceSurvey: "/survey/experienceDetails",
    experiencePage: "/survey/experience",
    doSurvey: strParam("/survey"),
    developmentPlan: "/plan/:challengeIds",
    doDevelopmentPlan: strParam("/plan")
  },

  admin: {
    insights: "/insights",
    createInsight: "/insights/new",
    viewInsight: "/insights/:id",
    doViewInsight: strParam("/insights"),

    profiles: "/profiles",
    viewProfile: "/profiles/:id",
    doViewProfile: strParam("/profiles"),
    createProfileStep: "/profiles/new/:step",
    doCreateProfileStep: strParam("/profiles/new"),
    editProfile: "/profiles/:id/edit",
    doEditProfile: strParam("/profiles", "/edit"),
    copyProfile: "/profiles/:id/copy",
    doCopyProfile: strParam("/profiles", "/copy"),
    profileChallenges: "/profiles/:id/challenges",
    doProfileChallenges: strParam("/profiles", "/challenges"),

    peopleDashboard: "/people/dashboard",
    peopleLeaders: "/people/leaders",
    peopleGroups: "/people/groups",
    peopleInsightPools: "/people/insight-pools",
    peopleProgrammes: "/people/programmes",

    developmentPlan: "/people/leaders/plan/:planId",
    doDevelopmentPlan: strParam("/people/leaders/plan"),
    newDevelopmentPlan: "/people/leaders/:userId/plan/new/:challengeIds",
    doNewDevelopmentPlan: (userId: string, challengeIds: string) =>
      `/people/leaders/${userId}/plan/new/${challengeIds}`,

    doInterViewGuideBuilder: (profileId: string) =>
      `/profiles/${profileId}/interview/igb`,
    interviewGuideBuilder: "/profiles/:profileId/interview/igb",

    resources: "/resources",

    subscriptions: "/subscriptions"
  }
};
