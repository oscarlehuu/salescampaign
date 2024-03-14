export const API_ENDPOINT = {
  // AUTH
  AUTH_REGISTER: "auth/register",
  AUTH_LOGIN: "auth/login",
  AUTH_ME: "auth/me",

  // CAMPAIGNS
  CAMPAIGNS: "/campaigns",

  //USER DATA
  ENDUSERS: "/users/recent/endusers",
  NEW_ENDUSERS_TODAY: (id) => `/users/${id}/endusers/?count=true`,
  RECENT_ENDUSERS: (id) => `/users/${id}/endusers/?count=true&recent=true`,
  TOTAL_ENDUSERS_OF_A_RESELLER: (id) => `/users/${id}/totalendusers`,

  //SUBSCRIPTION DATA
  SUBSCRIPTIONS: "/subscriptions",
  ACTIVE_RANKING: "/subscriptions/ranking",
  RESELLER_RANKING: (id) => `/subscriptions/${id}/ranking`,
  NEW_SUBSCRIPTIONS_TODAY: (id) => `/subscriptions/${id}?&count=true`,
  RECENT_SUBSCRIPTIONS: (id) => `/subscriptions/${id}?&count=true&recent=true`,
  RESELLER_CAMPAIGN_SUBSCRIPTIONS: (id) => `/subscriptions/active/${id}`,
};
