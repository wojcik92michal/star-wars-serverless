export const formatJSONResponse = <T = any>(
  response: T,
  statusCode = 200,
  message?: string
) => {
  return {
    statusCode,
    body: response,
    message,
  };
};

export const unexpectedErrorException = () => {
  return formatJSONResponse(undefined, 500, "Unexpected server error!");
};

export const notFoundException = () => {
  return formatJSONResponse(undefined, 404, "Item not found!");
};
