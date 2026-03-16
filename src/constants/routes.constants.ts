const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || '/';

export const APP_ROUTES = {
  DASHBOARD: {
    NAME: "dashboard",
    URL: "/dashboard",
  },
  ENVELOPES: {
    NAME: 'envelopes',
    URL: "/envelopes"
  },
  TRANSACTIONS: {
    NAME: 'transactions',
    URL: "/transactions"
  },
  ANALYTICS: {
    NAME: "analytics",
    URL: "/analytics",
  },
  SETTINGS: {
    NAME: "settings",
    URL: "/settings",
  },
  HELP_SUPPORT: {
    NAME: "help & support",
    URL: "/help-support",
  },
  CREATE_ACCOUNT: {
    NAME: "Create your account",
    URL: "/signup",
  },
  LOGIN: {
    NAME: "login",
    URL: "/login",
  },
  RESEND_VERIFICATION: {
    NAME: "resend verification",
    URL: "/resend-verification"
  },
  VERIFICATION_LINK_EXPIRED: {
    NAME: '/verification-link-expired',
    URL: "/verification-link-expired"
  },
  HOME: {
    NAME: 'home',
    URL: API_BASE_URL
  }
};
