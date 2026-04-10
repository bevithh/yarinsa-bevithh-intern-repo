import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get the required roles from the @Roles decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, let everyone in
    if (!requiredRoles) {
      return true;
    }

    // 2. Get the user from the request (Auth0 fills this in the JwtStrategy)
    const { user } = context.switchToHttp().getRequest();
    // Auth0 custom claims are accessed like this:
    const userRoles = user?.['https://focusbear.io/roles'] || [];

    // 3. Check if the user has at least one of the required roles
    // Note: Auth0 often puts roles in a custom namespace or 'permissions' array
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}