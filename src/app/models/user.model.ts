export type UserRole = 'agent' | 'requester';

export interface AppUser {
  uid: string;
  name: string;
  role: UserRole;
  email: string;
}