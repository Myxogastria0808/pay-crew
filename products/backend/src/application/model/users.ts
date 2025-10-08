import { UserGetResponseSchemaType, UserPostResponseSchemaType } from 'paycrew-validator';

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type UserServiceType = {
  postUserService: (userPostRequestSchema: UserType) => Promise<UserPostResponseSchemaType>;
  getUserService: () => Promise<UserGetResponseSchemaType>;
};
