export type ApiResponseTypes = {
  resultCode: number;
  data: {};
};

export type RegistrationResponseType = {
  addedUser: {
    created: string;
    email: string;
    name: string;
    _id: string;
    __v: number;
    publicCardPacksCount: number;
    rememberMe: boolean;
    isAdmin: boolean;
    updated: string;
    verified: boolean;
  };
};
