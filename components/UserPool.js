import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'XXXXXXXXX',
  ClientId: 'XXXXXXXXXX',
};

export default new CognitoUserPool(poolData);