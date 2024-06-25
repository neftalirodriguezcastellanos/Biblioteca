import { createContext, useContext } from "react";
import { tokenName, useSession } from "./SessionContext";

import { getResponseModel } from "../../model/responseModel";
import { useLayout } from "./LayoutContext";
import { isJsonString } from "../../settings/utils";

export const RequestContext = createContext();

export const RequestProvider = (props) => {
  const { handleOpenAlert, handleOpenLoader, handleCloseLoader } = useLayout();
  const { token } = useSession();

  const errorMessage = "Ocurrió un error al consumir el recurso solicitado";
  const errorForbiden =
    "No cuenta con los permisos necesarios para consumir este  recurso";
  const errorNotFound = "No se encontró el recurso solicitado";

  const GetRequest = async function (payload) {
    let response = getResponseModel();

    if (payload.loader) {
      handleOpenLoader(payload.loader);
    }
    try {
      let apiResponse = await fetch(payload.url, {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      });

      response = await responseValidatorJson(apiResponse);

      if (payload.alert) {
        if (!response.hasError) {
          handleOpenAlert(response.message, "success");
        } else {
          if (!isJsonString(response.message))
            handleOpenAlert(response.message);
        }
      }
    } catch (error) {
      response.hasError = true;
      response.httpCode = 500;
      response.message = errorMessage;

      handleOpenAlert(response.message);
    }

    handleCloseLoader();

    return response;
  };

  const PostRequest = async function (payload) {
    let response = getResponseModel();

    if (payload.loader) {
      handleOpenLoader(payload.loader);
    }

    try {
      let apiResponse = await fetch(payload.url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });

      response = await responseValidatorJson(apiResponse);

      if (payload.alert) {
        if (!response.hasError) {
          handleOpenAlert(response.message, "success");
        } else {
          handleOpenAlert(response.message);
        }
      }
    } catch (error) {
      response.hasError = true;
      response.httpCode = 500;
      response.message = errorMessage;

      handleOpenAlert(response.message);
    }

    handleCloseLoader();

    return response;
  };

  const PutRequest = async function (payload) {
    let response = getResponseModel();

    if (payload.loader) {
      handleOpenLoader(payload.loader);
    }

    try {
      let apiResponse = await fetch(payload.url, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });

      response = await responseValidatorJson(apiResponse);

      if (payload.alert) {
        if (!response.hasError) {
          handleOpenAlert(response.message, "success");
        } else {
          handleOpenAlert(response.message);
        }
      }
    } catch (error) {
      response.hasError = true;
      response.httpCode = 500;
      response.message = errorMessage;

      handleOpenAlert(response.message);
    }

    handleCloseLoader();

    return response;
  };

  const DeleteRequest = async function (payload) {
    let response = getResponseModel();

    if (payload.loader) {
      handleOpenLoader(payload.loader);
    }

    try {
      let apiResponse = await fetch(payload.url, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      });

      response = await responseValidatorJson(apiResponse);

      if (payload.alert) {
        if (!response.hasError) {
          handleOpenAlert(response.message, "success");
        } else {
          handleOpenAlert(response.message);
        }
      }
    } catch (error) {
      response.hasError = true;
      response.httpCode = 500;
      response.message = errorMessage;

      handleOpenAlert(response.message);
    }

    handleCloseLoader();

    return response;
  };

  const responseValidatorJson = async function (apiResponse) {
    if (apiResponse.status === 403) {
      return {
        hasError: true,
        httpCode: 403,
        message: errorForbiden,
      };
    }

    if (apiResponse.status === 401) {
      localStorage.removeItem(tokenName);
      window.location.reload();
      return {
        hasError: true,
        httpCode: 401,
        message: errorForbiden,
      };
    }

    return await apiResponse.json();
  };

  return (
    <RequestContext.Provider
      value={{
        GetRequest,
        PostRequest,
        PutRequest,
        DeleteRequest,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => useContext(RequestContext);
