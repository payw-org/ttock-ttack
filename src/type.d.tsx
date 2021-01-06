interface User {
    id: number
    name: string
  }
  
  type UserState = {
    users: User[]
  }
  
  type UserAction = {
    type: string
    user: User
  }
  
  type DispatchType = (args: UserAction) => UserAction