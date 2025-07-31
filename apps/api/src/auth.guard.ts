import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { IS_AUTH_OPTIONAL } from './decorator/user.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

const cookieTokenName = 'jwt-token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext().req;

    try {
      const tokenInCookie = request.cookies[cookieTokenName];
      const token =
        (request.headers.authorization as string).split(' ')[1] ||
        tokenInCookie;
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decode;

      return !!decode;
    } catch (err: any) {
      const isOptional = this.reflector.getAllAndOverride<boolean>(
        IS_AUTH_OPTIONAL,
        [context.getHandler(), context.getClass()],
      );

      return !!isOptional;
    }
  }
}
