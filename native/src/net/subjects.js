import { client, getRestPath } from "../utils";
import { receiveSubjects } from "../actions";

export const fetchSubjectsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchSubjects(getState())) {
    return dispatch(fetchSubjects());
  }
};

const fetchSubjects = () => dispatch => {
  return client
    .get(getRestPath("subjects"), function(data) {
      dispatch(receiveSubjects(data._embedded.msgSubjectList));
    })
    .on("error", function(err) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchSubjects = state => {
  const subjects = state.subjects.items;

  if (subjects.length === 0) {
    return true;
  }

  if (subjects.isFetching) {
    return false;
  }

  return subjects.didInvalidate;
};
