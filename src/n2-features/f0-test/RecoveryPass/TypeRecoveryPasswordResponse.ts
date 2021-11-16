export type RecoveryPasswordResp = {
  info: string;
};

export type RecoveryPasswordErrorResp = {
  error: string;
  info?: string;
  errorObject?: unknown;
  in: string;
};

export type PostRecoveryPasswordReq = {
  resetPasswordToken: string;
  password: string;
};
