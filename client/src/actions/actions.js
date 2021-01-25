import axios from "axios";
import axiosAuth from "../axiosAuth";

export const FOUND_LOCAL_TOKEN = "FOUND_LOCAL_TOKEN";
export const REQUESTING_LOGIN = "REQUESTING_LOGIN";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const REQUESTING_COLOR_DATA = "REQUESTING_COLOR_DATA";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const SENDING_EDITED_COLOR_DATA = "SENDING_EDITED_COLOR_DATA";
export const RECEIVED_EDITED_COLOR_DATA = "RECEIVED_EDITED_COLOR_DATA";
export const REQUESTING_COLOR_DELETION = "REQUESTING_COLOR_DELETION";
export const COLOR_DELETED = "COLOR_DELETED";
export const ERROR = "ERROR";

export const foundLocalToken = (token) => {
  return { type: FOUND_LOCAL_TOKEN, payload: token };
};

export const login = ({ username, password }) => (dispatch) => {
  dispatch({ type: REQUESTING_LOGIN });
  axios
    .post("http://localhost:5000/api/login", { username, password })
    .then((res) => {
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: USER_LOGGED_IN, payload: res.data.payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ERROR, payload: err });
    });
};

export const loadColorList = (token) => (dispatch) => {
  let axiosWithAuth = axiosAuth(token);

  dispatch({ type: REQUESTING_COLOR_DATA });
  axiosWithAuth
    .get("http://localhost:5000/api/colors")
    .then((res) => {
      dispatch({ type: DATA_RECEIVED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ERROR, payload: err });
    });
};

export const changeColor = (token, id, newData) => (dispatch) => {
  let axiosWithAuth = axiosAuth(token);

  dispatch({ type: SENDING_EDITED_COLOR_DATA });
  axiosWithAuth
    .put(`http://localhost:5000/api/colors/${id}`, newData)
    .then((res) => {
      dispatch({
        type: RECEIVED_EDITED_COLOR_DATA,
        payload: { ...res.data },
      });
    })
    .catch((err) => {
      dispatch({ type: ERROR, payload: err });
    });
};

export const deleteColor = (token, id) => (dispatch) => {
  let axiosWithAuth = axiosAuth(token);

  dispatch({ type: REQUESTING_COLOR_DELETION });
  axiosWithAuth
    .delete(`http://localhost:5000/api/colors/${id}`)
    .then((res) => {
      dispatch({ type: COLOR_DELETED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: ERROR, payload: err });
    });
};
