import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ca-central-1_Zh3w9bfM1",
  ClientId: "1ct6ndraagd3m5kuu8sdha3f4e",
};

export default new CognitoUserPool(poolData);
