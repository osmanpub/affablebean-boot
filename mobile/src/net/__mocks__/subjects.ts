import {RootState} from '../../redux';
import {receiveSubjects} from '../../redux/subjects';

export const fetchSubjectsIfNeeded = () => (
  dispatch: Function,
  getState: Function,
) => {
  if (shouldFetchSubjects(getState())) {
    return dispatch(fetchSubjects());
  }
};

const fetchSubjects = () => (dispatch: Function) => {
  const subjectsList = [
    {
      id: 1,
      name: 'Brands or product',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/1'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 2,
      name: 'Investor relations',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/2'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 3,
      name: 'Sustainability',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/3'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 4,
      name: 'The Company',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/4'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 5,
      name: 'Media enquiry',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/5'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 6,
      name: 'Website feedback',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/6'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
    {
      id: 7,
      name: 'Other',
      _links: {
        self: {href: 'http://localhost:8080/api/subjects/7'},
        subjects: {href: 'http://localhost:8080/api/subjects'},
      },
    },
  ];
  dispatch(receiveSubjects(subjectsList));
};

const shouldFetchSubjects = (state: RootState) => {
  const {subjects} = state;
  const {items} = subjects;

  if (items.length === 0) {
    return true;
  }

  if (subjects.isFetching) {
    return false;
  }

  return subjects.didInvalidate;
};
