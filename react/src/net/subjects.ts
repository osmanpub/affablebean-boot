import axios from "axios";
import { client, getNodePath, getRestPath, IS_NODE } from "../helpers/utils";
import { RootState } from "../redux";
import { isFetching, receiveSubjects } from "../redux/subjects";

export const fetchSubjectsIfNeeded = () => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchSubjects(getState())) {
    return dispatch(fetchSubjects());
  }
};

const fetchSubjects = () => (dispatch: Function) => {
  if (IS_NODE) {
    dispatch(isFetching(true));

    return axios
      .get(getNodePath("subjects"))
      .then(response => {
        dispatch(receiveSubjects(response.data.subjects));
      })
      .catch(error => console.log(error))
      .finally(() => dispatch(isFetching(false)));
  }

  return client
    .get(getRestPath("subjects"), function(data: any) {
      dispatch(receiveSubjects(data._embedded.msgSubjectList));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchSubjects = (state: RootState) => {
  const { subjects } = state;
  const { items } = subjects;

  if (items.length === 0) {
    return true;
  }

  if (subjects.isFetching) {
    return false;
  }

  return subjects.didInvalidate;
};
