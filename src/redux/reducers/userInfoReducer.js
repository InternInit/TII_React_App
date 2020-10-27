const userInfoReducer = (
  state = {
    username: "",
    displayName: "",
    avatar: "",
    email: "",
    id: "",
    version: 0,
    pinnedBusinesses: [],
    activeApplications: [],
    checkedIndustries: [],
    disabledIndustries: [],
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_USER_NAME":
      return Object.assign({}, state, {
        username: action.username,
      });
    case "UPDATE_DISPLAY_NAME":
      return Object.assign({}, state, {
        displayName: action.displayName,
      });
    case "UPDATE_AVATAR":
      return Object.assign({}, state, {
        avatar: action.avatar,
      });
    case "UPDATE_EMAIL":
      return Object.assign({}, state, {
        email: action.email,
      });
    case "UPDATE_ID":
      return Object.assign({}, state, {
        id: action.id,
      });
    case "UPDATE_VERSION":
      return Object.assign({}, state, {
        version: action.version,
      });
    case "UPDATE_PINNED_BUSINESSES":
      return Object.assign({}, state, {
        pinnedBusinesses: action.pinnedBusinesses,
      });
    case "UPDATE_ACTIVE_APPLICATIONS":
      return Object.assign({}, state, {
        activeApplications: action.activeApplications,
      });
    case "UPDATE_CHECKED_INDUSTRIES":
      return Object.assign({}, state, {
        checkedIndustries: action.checkedIndustries,
      });
    case "UPDATE_DISABLED_INDUSTRIES":
      return Object.assign({}, state, {
        disabledIndustries: action.disabledIndustries,
      });
    case "REMOVE_ONE_BUSINESS":
      return {
        ...state,
        pinnedBusinesses: state.pinnedBusinesses.filter(
          (business) => business.Id !== action.businessId
        ),
      };
    case "ADD_ONE_BUSINESS":
      return {
        ...state,
        pinnedBusinesses: state.pinnedBusinesses.concat(action.business),
      }
    default:
      return state;
  }
};

export default userInfoReducer;
