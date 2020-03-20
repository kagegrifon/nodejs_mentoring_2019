import jwt from 'jsonwebtoken';
import { SECRET } from '../config/secret';

export const checkToken = function(req: any, res: any, next: any) {
  const token = req.headers['my-hidden-access-token'];
  
  if (token) {
    jwt.verify(token, SECRET, (err: Error, decoded: any) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token' });
      } else {
        console.log('decoded', decoded);
        next();
      }
    })
  } else {
    res.status(403).send({ success: false, message: 'No token provided' });
  }
}
