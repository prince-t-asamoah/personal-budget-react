export type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreedTotermsOfService?: boolean;
}

export type ResetPasswordFormData = {
  newPassword: string;
  confirmNewPassword: string;
};

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  addressDetails: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  hasAuthenticationError: boolean;
}

export type AuthStateActions =
  { type: 'SET_IS_AUTHENTICATED', payload: boolean } |
  { type: 'SET_USER', payload: AuthUser | null } |
  { type: 'SET_IS_AUTHENTICATING', payload: boolean } |
  { type: 'SET_HAS_AUTHENTICATED_ERROR', payload: boolean };