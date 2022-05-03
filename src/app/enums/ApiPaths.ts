import { environment } from "src/environments/environment";
const AUTH = environment.baseUrl+"/auth";
export const LOGIN_PATH = AUTH+"/login";
export const REGISTER_PATH = AUTH+"/register";

export const USER = environment.baseUrl+"/users";
export const USER_PATH = USER+"/me";
export const CONTACT_PATH = USER+"/contact";
export const DISCOVER_CONTACT_PATH = USER+"/discover";

const FILE = environment.baseUrl+"/files";
export const PICTURE_DOWLOAD = FILE+"/download/picture";
export const FILE_DOWLOAD = FILE+"/download/file";
export const PICTURE_UPLOAD = FILE+"/picture";
const MESSENGER = environment.baseUrl+"/messenger";
export const CONVERSATION = MESSENGER + "/conversation";
export const START_CONVERSATION = CONVERSATION+"/init"

export const getImage = (id : number) : string  => {
  return `${FILE_DOWLOAD}/${id}`;
}
export const sendImage = (cid : number) : string =>{
  return `${CONVERSATION}/${cid}/file`
}
export const setSeen = (cid : number) : string =>{
  return `${CONVERSATION}/${cid}/seen`
}
