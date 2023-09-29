import remove from "lodash/remove";
import * as uuid from "uuid";
import { localStore } from "utils";

type SavedRequest = {
  uri: string;
  httpMethod: string;
  guid: string;
};

const auth = {
  token: localStore.getData("token"),
};

const getToken = () => {
  if (auth.token) {
    return auth.token;
  }

  auth.token = localStore.getData("token");

  return auth.token;
};

export class api {
  /*
   * #### "INTERNAL DDOS"
   *
   * Every request is being pushed to the lastRequests array and stored there for a time frame. (lastRequestsTimeFrame)
   * This array will be used to identify requests which have been made too many times and therefore block the creation
   * of new requests completely. If a user reaches the max amount of having the same request within the last requests
   * time frame, we stop the application and open a confirmation which will close the tab when clicked on ok. Thereby we
   * prevent small "DOS" attacks to our own servers, which could be caused by errors in the frontend.
   */
  private static lastRequests: SavedRequest[] = [];

  // The amount of the same request uri, that is allowed to exist in the last requests time frame.
  private static maxAmountOfSameRequest: number = 60;

  // The duration a request is being count as one of the last requests (in milliseconds).
  private static lastRequestsTimeFrame: number = 15000;

  // When true, block all further requests to avoid a mini "DOS" attack
  private static blockAllNewRequests: boolean = false;

  private static blockedUri: string = "";

  /*
   * #### UTILS
   */
  private static handleRejection(response: any) {
    const contentType = response.headers.get("content-type");

    let rejection;
    if (contentType && contentType.indexOf("application/json") > -1) {
      rejection = response.json().then((json: any) => {
        throw new Error(json);
      });
    } else {
      rejection = response.text().then((text: string) => {
        throw new Error(text);
      });
    }

    return rejection;
  }

  private static registerRequest(uri: string, method: string) {
    const lastRequestsWithSameURI = api.lastRequests.filter((request) => {
      return request.uri === uri && request.httpMethod === method;
    });

    if (lastRequestsWithSameURI.length >= api.maxAmountOfSameRequest) {
      api.blockedUri = uri;
      api.blockAllNewRequests = true;
    }

    const requestGuid = uuid.v4();

    api.lastRequests.push({
      uri,
      httpMethod: method,
      guid: requestGuid,
    });

    // After the lastRequestsTimeFrame, we remove the request from our lastRequests
    setTimeout(
      () => remove(api.lastRequests, (request) => request.guid === requestGuid),
      api.lastRequestsTimeFrame
    );
  }

  /*
   * #### CORE FUNCTIONALITY
   */
  private static fetch<T extends unknown>(
    resourceUri: string,
    method: string,
    optionsOverwrite: RequestInit,
    data?: object
  ): Promise<T> {
    if (api.blockAllNewRequests) {
      // eslint-disable-next-line no-alert
      alert(`The client blocked further requests, as too many successive calls triggered our security mechanism.
        \nPlease provide a screenshot of this message to our support team.
        \nLast Requests: ${api.lastRequests.length}
        \nBlocked URI: ${api.blockedUri}
      `);

      return new Promise(() => undefined);
    }

    const uri = api.baseURI() + resourceUri;

    const body = data ? JSON.stringify(data) : null;

    const headers = {
      "content-type": "application/json",
      // Persists the location including the part after the #. Used for throwing exceptions and stuff.
      "x-ref-location": window.location.toString(),
      credentials: "include",
      Authorization: `Bearer ${getToken()}`,
    };

    const defaultOptions = {
      credentials: "include" as RequestCredentials,
      body,
      headers,
      method,
    };

    const options = {
      ...defaultOptions,
      ...optionsOverwrite,
    };

    api.registerRequest(uri, method);

    return new Promise((resolve, reject) => {
      fetch(new Request(uri, options))
        .then(async (response) => {
          // Handle simple cases without double confirmation.
          if (!response.ok) {
            reject(api.handleRejection(response));
          } else {
            try {
              const responseJson = await response.json();
              resolve(responseJson);
            } catch (error) {
              console.error("API_ERROR[2]: ", error);
            }
          }
        })
        .catch((err) => console.error("API_ERROR[1]: ", err));
    });
  }

  /*
   * #### PUBLIC INTERFACE
   */
  public static get<T>(resourceUri: string, options = {}) {
    return api.fetch<T>(resourceUri, "GET", options);
  }

  public static post(resourceUri: string, data: any, options = {}) {
    return api.fetch(resourceUri, "POST", options, data);
  }

  public static delete(resourceUri: string, options = {}) {
    return api.fetch(resourceUri, "DELETE", options);
  }

  public static put(resourceUri: string, data: any, options = {}) {
    return api.fetch(resourceUri, "PUT", options, data);
  }

  public static baseURI(): string {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:5001/api/";
    }

    return "api/";
  }
}
