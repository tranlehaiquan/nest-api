import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = (request.headers.authorization as string).split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      request.user = decode;

      return !!decode;
    } catch (err: any) {
      return false;
    }
  }
}
