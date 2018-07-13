export interface Tweet {
  id: string
  text: string
  author: User
}

export interface User {
  id: string
  name: string
  username: string
  email: string
}
