export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreedTotermsOfService?: boolean;
}

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  addressDetails: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export type AuthStateActions = { type: 'SET_IS_AUTHENTICATED', payload: boolean } | { type: 'SET_USER', payload: AuthUser | null };