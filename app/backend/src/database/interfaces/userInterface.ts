interface IUser {
  username: string,
  role: string,
  email: string,
  password: string
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

export { IToken, ILogin, IUser };
