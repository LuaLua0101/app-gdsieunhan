const initState = [];
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case "init_timekeeping":
      return [...action.timekeeping];
    case "add_timekeeping":
      const newState = state.map(obj =>
        obj.id === action.id ? { ...obj, checkin: action.checkin } : obj
      );
      return newState;
    case "del_timekeeping":
      const _newState = state.map(obj =>
        obj.id === action.id ? { ...obj, checkin: null } : obj
      );
      console.log(_newState);
      return [..._newState];
    default:
      return state;
  }
}
