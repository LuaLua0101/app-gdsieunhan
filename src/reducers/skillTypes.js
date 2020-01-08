const initState = [];
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case "init_skill_types":
      return [...action.skill_types];
    case "add_skill_types":
      return [...action.skill_types, ...state];
    case "del_skill_types":
      return state.filter((value, index, arr) => {
        return value.id !== action.id;
      });
    default:
      return state;
  }
}
