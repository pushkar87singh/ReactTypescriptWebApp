export enum LeError {
  INVALID_EMAIL = "ERROR_INVALID_EMAIL",
  SUBSCRIPTION_MANAGER_EXISTS = "ERROR_ALREADY_HR_MANAGER"
}

interface ILeaderEdgeError {
  method: string;
  url: string;
  status: number;
  kind: string;
}

/*
  Converts any thrown error to a LeaderEdge error for more helpful
  user notifcations. Returns `null` if a valid LE error does not
  exist on the error object.
*/
export function getLeaderEdgeError(err: any): ILeaderEdgeError | null {
  if ("graphQLErrors" in err && err.graphQLErrors.length) {
    const gqlError = err.graphQLErrors[0];

    if (gqlError.extensions && gqlError.extensions.exception) {
      const info = gqlError.extensions.exception.info;

      return info
        ? {
            method: info.method,
            url: info.url,
            status: info.statusCode,
            kind: info.extra
          }
        : null;
    }
  }

  return null;
}
