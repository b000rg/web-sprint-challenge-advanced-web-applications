import {
  REQUESTING_COLOR_DATA,
  DATA_RECEIVED,
  ERROR,
  FOUND_LOCAL_TOKEN,
  REQUESTING_LOGIN,
  USER_LOGGED_IN,
  SENDING_EDITED_COLOR_DATA,
  RECEIVED_EDITED_COLOR_DATA,
  REQUESTING_COLOR_DELETION,
  COLOR_DELETED,
} from "../actions/actions";

export const initialState = {
  token: "",
  loggingIn: false,
  colorList: [],
  loadingData: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case REQUESTING_LOGIN:
      return { ...state, loggingIn: true };
    case USER_LOGGED_IN:
      return { ...state, loggingIn: false, token: action.payload };
    case FOUND_LOCAL_TOKEN:
      return { ...state, token: action.payload };
    case REQUESTING_COLOR_DATA ||
      SENDING_EDITED_COLOR_DATA ||
      REQUESTING_COLOR_DELETION:
      return { ...state, loadingData: true };
    case DATA_RECEIVED:
      return { ...state, loadingData: false, colorList: action.payload };
    case RECEIVED_EDITED_COLOR_DATA:
      console.log(action.payload);
      return {
        ...state,
        loadingData: false,
        colorList: state.colorList.map((originalColor) =>
          originalColor.id === action.payload.id
            ? action.payload
            : originalColor
        ),
      };
    case COLOR_DELETED:
      return {
        ...state,
        colorList: state.colorList.filter(
          (color) => color.id !== action.payload
        ),
      };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
