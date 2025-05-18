import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    email: 'admin@shophub.com',
    name: 'Admin User',
    isAdmin: true,
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    isAdmin: false,
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};