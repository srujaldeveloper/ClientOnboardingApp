import axios from "axios";

export const token = ()=> ({ 
  headers: {
    Auth_domain: localStorage.getItem("Auth_domain"),
    Authorization: "Basic " + localStorage.getItem("Token")
  }
});
const config = {
  baseURL: "https://app.strategyorchestrator.com/api"
};
export const METHOD = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch"
};

export default (
  endpoint,
  params = {},
  onSuccess,
  onFailure,
  method = METHOD.GET,
  DyanamicConfig = {},
  NeedErrorHandle = true
) => {
  console.log("endpoint", endpoint, method);
  let request = {};
  switch (method) {
    case METHOD.POST:
      request = axios.post(
        endpoint,
        { ...params },
        { ...config, ...DyanamicConfig }
      );
      break;
    case METHOD.GET:
      request = axios.get(endpoint, { ...config, ...DyanamicConfig });

      break;
    case METHOD.DELETE:
      request = axios.delete(endpoint, { ...config, ...DyanamicConfig });
      break;
    case METHOD.PUT:
      request = axios.put(
        endpoint,
        { ...params },
        { ...config, ...DyanamicConfig }
      );
      break;
    case METHOD.PATCH:
      request = axios.patch(
        endpoint,
        { ...params },
        { ...config, ...DyanamicConfig }
      );
      break;
  }
  request
    .then(response => {
      var error = response.error;
      if (response) {
        if (response.status == 200) {
          try {
            onSuccess(response.data);

            //onSuccess(response)
          } catch (err) {
            if(NeedErrorHandle)
            onFailure("Something went wrong");
          }
        } else if (response.status == 401) {
          if(NeedErrorHandle)
          onFailure("Session expired");
        } else {
          if(NeedErrorHandle)
          onFailure(
            error && typeof error === "string" ? error : "Something went wrong"
          );
        }
      } else {
        if(NeedErrorHandle)
        onFailure("Something went wrong");
      }
    })
    .catch(error => {
      console.log(error);
      if (error && error.response) {
        switch (error.response.status) {
          case 401:
            if(NeedErrorHandle)
            onFailure("Session expired");
            break;

          default:
            if(NeedErrorHandle)
            onFailure(
              error && typeof error === "string"
                ? error
                : "Something went wrong"
            );
            break;
        }
      } else { 
        if(NeedErrorHandle)
        onFailure("Something went wrong")};
    });
};
