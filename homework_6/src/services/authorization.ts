import {  
  AuthServiceInterface,
  LoginParams
} from '../interfaces/authorization';

import { errorLogger, getCommonLogger } from '../logger';

const logError = getCommonLogger({
  logger: errorLogger,
  level: 'warn', 
  layer: 'Authorization',
});

export class AuthService implements AuthServiceInterface {
  constructor(private authModel: any) {
    this.authModel = authModel;
  }

  login = async (data: LoginParams) => {
    const { username, password } = data;
    try {
      const authData = await this.authModel.findOne({
        where: {
          username,
        },
        raw: true,
      });

      const isCorrectPass = authData && authData.password === password;
      return isCorrectPass;
    } catch(error) {
      logError('Error on authentication', { error, params: { username } });
      throw error;
    }
  };
}
