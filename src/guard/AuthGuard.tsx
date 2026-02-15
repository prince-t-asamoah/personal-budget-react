import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes.constants";

export default function AuthGuard({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isAuthenticated = true;

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={APP_ROUTES.CREATE_ACCOUNT.URL} replace />
      )}
    </>
  );
}
