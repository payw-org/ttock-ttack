import * as ActionTypes from '../../data/rootActionTypes'

const initialState: UserState = {
  users: [
    {
      id: 1,
      name: '최범수',
    },
    {
      id: 2,
      name: '김정빈',
    },
  ],
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTH:
      return action.user

    case ActionTypes.RESET_AUTH:
      return null

    default:
      return state
  }
}
