export interface User{
  id : number | undefined,
  username ?: string ,
  contacts ?: User[] ,
  firstName? : string,
  lastName?: string,
  birthday?: Date,
  phone?: string,
  email?: string
  online?: boolean,
  lastOnline?: string,
  guest?: boolean,
  password?: string,
}
