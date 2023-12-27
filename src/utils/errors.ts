export interface HttpValidationError {
  detail: {
    loc: [string, number];
    msg: string;
    type: string;
  }[];
}
export interface ErrorModel {
  detail:
    | {
        code: string;
        reason: string;
      }
    | string;
}

export function getTextErrorMessage(
  dataError: HttpValidationError | ErrorModel | string
): string[] {
  if (typeof dataError === "string") {
    return [dataError];
  } else if (Array.isArray(dataError.detail)) {
    return dataError.detail.map((item) => item.msg);
  } else if (typeof dataError.detail === "string") {
    return [dataError.detail];
  } else {
    return [dataError.detail.code + " " + dataError.detail.reason];
  }
}
