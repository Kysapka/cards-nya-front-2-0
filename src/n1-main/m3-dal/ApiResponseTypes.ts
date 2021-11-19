export type ApiResponseTypes<D = {}> = {
  status: string;
  statusText: string;
  data: D;
};

export type ErrorResponseType = {
  response: {
    data: {
      error: string;
    };
  };
  status: string;
  statusText: string;
};
export type DeleteResponseType = {
  info: string;
  error: string;
};

export type UserDataResponseType = {
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
