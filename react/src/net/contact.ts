import axios from "axios";
import { getPath } from "../helpers/utils";

export const sendFeedback = (data: any) => {
  axios({
    method: "post",
    url: getPath("contact2"),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  })
    .then(response => response.data)
    .catch(error => console.log(error));
};
