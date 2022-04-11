export interface UserType {
  name: String;
}

export interface User {
  _id?: any;
  type: UserType;
  lastName?: String;
  firstName: String;
  login: String;
}
