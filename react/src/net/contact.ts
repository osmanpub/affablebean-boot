import axios from "axios";
import { getPath } from "../helpers/utils";
import { goHome } from "../redux/ui";

export const sendFeedback = (data: any) => (dispatch: Function) => {
  axios({
    method: "post",
    url: getPath("contact2"),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  })
    .then(response => {
      dispatch(goHome({}));
    })
    .catch(error => console.log(error));
};
