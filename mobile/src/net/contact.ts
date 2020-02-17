import axios from 'axios';
import {getNodePath, getPath, IS_NODE} from '../helpers/utils';
import {goHome, setFormErrors} from '../redux/ui';

export const sendFeedback = (data: any) => (dispatch: Function) => {
  axios({
    method: 'post',
    url: IS_NODE ? getNodePath('contact') : getPath('contact2'),
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    withCredentials: true,
  })
    .then(response => {
      const {data} = response;

      if (!data) {
        return;
      }

      if (data === true || data.success === true) {
        dispatch(goHome({}));
      } else if (data.success === false) {
        dispatch(setFormErrors(data.errors));
      }
    })
    .catch(error => console.log(error));
};
