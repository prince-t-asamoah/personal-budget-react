import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes.constants";
import { useAuthContext } from "../context/auth.context";
import AppLoader from "../components/AppLoader/AppLoader";

export default function AuthGuard({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { state } = useAuthContext();

  if (state.isAuthenticating) {
    return <AppLoader message="Verifying session..." />;
  }

  return (
    <>
      {state.isAuthenticated ? (
        children
      ) : (
        <Navigate to={APP_ROUTES.LOGIN.URL} replace />
      )}
    </>
  );
}
