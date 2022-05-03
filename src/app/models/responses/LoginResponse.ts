export interface LoginResponse{
  jwt : string | undefined,
  error : boolean,
  message : string | undefined
}
