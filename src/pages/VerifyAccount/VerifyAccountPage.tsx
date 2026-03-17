import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader/AppLoader";
import { verifyEmail } from "../../services/apis/authApi.service";
import { APP_ROUTES } from "../../constants/routes.constants";
import useNotification from "../../hooks/useNotification";

export default function VerifyAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notification = useNotification();

  useEffect(() => {
    verifyEmail(searchParams.get("token") ?? "")
      .then(async (response) => {
        if (!response.ok) {
          navigate(APP_ROUTES.VERIFICATION_LINK_EXPIRED.URL, { replace: true });
          throw new Error(response.statusText);
        }
        notification.success({
          title: "Account Verification",
          message: "Email verification successful",
        });
        navigate(APP_ROUTES.LOGIN.URL, { replace: true });
      })
      .catch((error: unknown) => {
        console.error("User email verification: ", error);
      });
  }, [searchParams, navigate, notification]);

  return <AppLoader message="Verifying account" />;
}
