export type ForgetPasswordResp = {
  answer: boolean;
  html: boolean;
  info: string;
  success: boolean;
};

export type ForgetPasswordErrorResp = {
  email: string;
  error: string;
  in: string;
};

export type PostForgetPasswordReq = {
  email: string;
  from: string;
  message: string;
};
