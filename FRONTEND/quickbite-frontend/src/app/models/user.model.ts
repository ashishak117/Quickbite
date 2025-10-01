export type Role = 'CUSTOMER' | 'OWNER' | 'ADMIN';

export interface User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  role: Role;
}
