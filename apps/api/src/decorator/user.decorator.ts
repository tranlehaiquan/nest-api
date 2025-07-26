import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): { id: string } | undefined => {
    const request =
      ctx.switchToHttp().getRequest() ||
      GqlExecutionContext.create(ctx).getContext().req;

    return request.user as { id: string };
  },
);

// set metadata authenticate is optional
export const IS_AUTH_OPTIONAL = 'IS_AUTH_OPTIONAL';
export const AuthIsOptional = () => SetMetadata(IS_AUTH_OPTIONAL, true);
