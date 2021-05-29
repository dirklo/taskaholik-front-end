const initialState = {
  authChecked: false,
  loggedIn: false,
  currentUser: {}
};

export default function authReducer(state = initialState, action) {
  let user

  switch (action.type) {
    case 'AUTHENTICATED':
      return {
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload
      };
    case 'NOT_AUTHENTICATED':
      return {
        authChecked: true,
        loggedIn: false,
        currentUser: {}
      };
    case 'SET_USER_SELECTED':
      user = state.currentUser
      for (const attribute in action.payload) {
        user[attribute] = action.payload[attribute]
      }
      
      return {
        ...state,
        currentUser: user
      }
    default:
      return state;
  }
}