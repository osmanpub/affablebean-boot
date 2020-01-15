import { client, getRestPath } from "../utils";
import { receiveSubjects } from "../redux/subjects";

export const fetchSubjectsIfNeeded = () => (
  dispatch: Function,
  getState: Function
) => {
  if (shouldFetchSubjects(getState())) {
    return dispatch(fetchSubjects());
  }
};

const fetchSubjects = () => (dispatch: Function) => {
  return client
    .get(getRestPath("subjects"), function(data: any) {
      dispatch(receiveSubjects(data._embedded.msgSubjectList));
    })
    .on("error", function(err: any) {
      console.log("something went wrong on the request", err.request.options);
    });
};

const shouldFetchSubjects = (state: any) => {
  const subjects = state.subjects.items;

  if (subjects.length === 0) {
    return true;
  }

  if (subjects.isFetching) {
    return false;
  }

  return subjects.didInvalidate;
};
