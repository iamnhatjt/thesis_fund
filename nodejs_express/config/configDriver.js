const { google } = require("googleapis");

const apikeys = require("../apikeys.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

const driverConfig = async () => {
  const auth = await authorize();
  return google.drive({ version: "v3", auth: auth });
};

module.exports = driverConfig;
