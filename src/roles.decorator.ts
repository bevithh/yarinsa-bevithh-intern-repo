import { SetMetadata } from '@nestjs/common';

// Key use to store the role in the metadata
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);