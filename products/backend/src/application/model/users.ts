import { UserGetResponseSchemaType, UserPostRequestSchemaType, UserPostResponseSchemaType } from 'paycrew-validator';

export type UserServiceType = {
  postUserService: (userPostRequestSchema: UserPostRequestSchemaType) => Promise<UserPostResponseSchemaType>;
  getUserService: () => Promise<UserGetResponseSchemaType>;
};
