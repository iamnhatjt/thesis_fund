const success = ({ data, message, statusCode }) => {
  return {
    status: statusCode || 200,
    message: message || "OK",
    data: data,
  };
};

const error = ({ logError, message, code }) => {
  console.log(logError);
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  const findCode = codes.find((e) => e === code);
  code = findCode || 500;

  return {
    status: code,
    message: message || "Internal Server Error",
    timestamp: Date.now(),
  };
};

const responseApi = {
  success,
  error,
};

module.exports = responseApi;
