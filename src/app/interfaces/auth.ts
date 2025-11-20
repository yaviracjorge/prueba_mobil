export interface RegisterUser {
  email: string;
  username: string;
  password: string;
  confirmpassword?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
