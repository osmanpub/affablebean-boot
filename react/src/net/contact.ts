import axios from "axios";
import { getNodePath, getPath, IS_NODE } from "../helpers/utils";
import { goHome } from "../redux/ui";

export const sendFeedback = (data: any) => (dispatch: Function) => {
  axios({
    method: "post",
    url: IS_NODE ? getNodePath("contact") : getPath("contact2"),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
    withCredentials: true
  })
    .then(response => {
      if (response.data === true) {
        dispatch(goHome({}));
      }
    })
    .catch(error => console.log(error));
};
