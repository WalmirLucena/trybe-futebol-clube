interface IUser extends ILogin{
  username: string,
  role: string,
}

interface ILogin {
  email: string,
  password: string,
}

interface IToken {
  username: string,
  role: string,
  email: string
}

interface IModel extends IUser{
  id: string;
}

export { IToken, ILogin, IUser, IModel };
