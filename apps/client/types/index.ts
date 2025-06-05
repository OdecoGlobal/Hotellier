export type User = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'OWNER';
  userName: string;
};
export type ApiSessionResponse = {
  data: Session;
};
export type Session = {
  user: User;
  token: string;
};
