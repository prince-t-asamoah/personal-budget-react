import { useState, useEffect, useCallback } from "react";
import AppLoader from "../../../components/AppLoader/AppLoader";
import BudgetPage from "../BudgetPage";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import type { Envelope } from "../../../models/envelopes.model";
import { fetchEnvelopes } from "../../../services/apis/envelopesApi.service";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import { AppLoadServerError } from "../../../components/AppLoader/AppLoadServerError";
import { AppLoadSessionExpiredError } from "../../../components/AppLoader/AppLoadSessionExpiredError";

export default function BudgetRoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasServerError, setHasServrError] = useState(false);
  const [hasSessionError, setHasSessionError] = useState(false);
  const { dispatch } = useEnvelopesContext();

  const getAllEnvelopes = useCallback(() => {
    setIsLoading(true);
    setHasLoadingError(false);
    setHasServrError(false);
    setHasSessionError(false);

    fetchEnvelopes()
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = (await response.json()) as ErrorApiResponse;
          throw errorResponse;
        }
        return (await response.json()) as SuccessApiResponse<Envelope[]>;
      })
      .then((response) => {
        setIsLoading(false);
        setHasLoadingError(true);
        setHasServrError(false);
        setHasSessionError(false);

        if (response.data && response.data.length > 0) {
          dispatch({ type: "SET_ENVELOPES", payload: response.data });
        } else {
          dispatch({ type: "SET_ENVELOPES", payload: [] });
        }
      })
      .catch((error: unknown) => {
        setIsLoading(false);
        setHasLoadingError(true);

        // Handle API Errors
        const apiError = error as ErrorApiResponse;

        if (apiError.error.type === "ServerError") {
          setHasServrError(true);
        } else if (apiError.error.type === "UnAuthorizedError") {
          setHasSessionError(true);
        }

        console.error("Error fetching all envelopes: ", error);
      });
  }, [dispatch]);

  const retry = () => getAllEnvelopes();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllEnvelopes();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [getAllEnvelopes]);

  if (isLoading) {
    return <AppLoader />;
  } else if (hasLoadingError && hasServerError) {
    return <AppLoadServerError retry={retry} />;
  } else if (hasLoadingError && hasSessionError) {
    return <AppLoadSessionExpiredError />;
  } else {
    return <BudgetPage />;
  }
}
