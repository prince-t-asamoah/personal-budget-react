const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || '/';

export const APP_ROUTES = {
  DASHBOARD: {
    NAME: "dashboard",
    URL: "/app/dashboard",
  },
  ENVELOPES: {
    NAME: 'envelopes',
    URL: "/app/envelopes"
  },
  TRANSACTIONS: {
    NAME: 'transactions',
    URL: "/app/transactions"
  },
  ANALYTICS: {
    NAME: "analytics",
    URL: "/app/analytics",
  },
  SETTINGS: {
    NAME: "settings",
    URL: "/app/settings",
  },
  HELP_SUPPORT: {
    NAME: "help & support",
    URL: "/app/help-support",
  },
  CREATE_ACCOUNT: {
    NAME: "Create your account",
    URL: "/signup",
  },
  LOGIN: {
    NAME: "login",
    URL: "/login",
  },
  FORGOT_PASSWORD: {
    NAME: "forgot password",
    URL: "/forgot-password",
  },
  RESET_PASSWORD: {
    NAME: "reset password",
    URL: "/reset-password",
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
