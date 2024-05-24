const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const authUrl = {
  signIn: `${BASE_URL}/auth/signIn`,
  signUp: `${BASE_URL}/auth/signup`,
  forgotPassword: `${BASE_URL}/auth/forgotPassword`,
  resetPassword: `${BASE_URL}/auth/resetPassword`,
};

const gpCompany = {
  gpCompany: `${BASE_URL}/gpCompany`,
  idGpCompany: (id) => `${BASE_URL}/gpCompany/${id}`,
  status: `${BASE_URL}/gpCompany/status`,
};

const fund = {
  fund: `${BASE_URL}/fund`,
  idFund: (id) => `${BASE_URL}/fund/${id}`,
  moneyFund: (id) => `${BASE_URL}/fund/moneyFund/${id}`,
};

const account = {
  allAccount: `${BASE_URL}/account/all`,
  me: `${BASE_URL}/account/me`,
  changePassword: `${BASE_URL}/account/changePassword`,
};

const doc = {
  doc: `${BASE_URL}/doc`,
  idDoc: (id) => `${BASE_URL}/doc/${id}`,
};
const docFund = {
  doc: `${BASE_URL}/docFund`,
  idDoc: (id) => `${BASE_URL}/docFund/${id}`,
};

export { authUrl, gpCompany, fund, account, doc, docFund };
