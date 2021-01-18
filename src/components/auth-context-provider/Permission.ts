enum Permission {
  LOGIN_ADMIN = "login",
  LEADERS_ADD = "leaders.add",
  PROGRAMMES_CREATE = "programmes.create",
  PROGRAMMES_UPDATE = "programmes.update",
  PROGRAMMES_MANAGE_ADMINS = "programmes.manageAdmins",
  PROGRAMMES_MANAGE_LEADERS = "programmes.manageLeaders",
  GROUPS_CREATE = "groups.create",
  GROUPS_UPDATE = "groups.update",
  GROUPS_MANAGE_LEADERS = "groups.manageLeaders",
  SUBSCRIPTION_ADD_PROGRAMME_ADMIN = "subscription.addProgrammeAdmin",
  SUBSCRIPTION_MANAGERS_ADD = "subscriptionManagers.add",
  SUBSCRIPTION_MANAGERS_VIEW = "subscriptionManagers.view",
  INSIGHTS_ADD = "insights.add",
  ALL_SUBSCRIPTIONS_VIEW = "allSubscriptions.view",
  ALL_SUBSCRIPTIONS_MAKE_EFFECTIVE = "allSubscriptions.makeEffective"
}

export default Permission;
