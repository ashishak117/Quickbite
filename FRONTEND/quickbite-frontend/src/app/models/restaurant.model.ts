export interface Restaurant {
  id?: number;
  name: string;
  about?: string;
  address?: string;
  email?: string;
  phone?: string;
  image?: string;
  ownerId?: number;
  approved?: boolean; // admin approval
  deniedMessage?: string;
}
