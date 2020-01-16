export interface Subjects {
  isFetching: boolean;
  didInvalidate: boolean;
  items: Array<SubjectState>;
}

export interface Subject {
  id: number;
  name: string;
}

export type SubjectState = Subject & { _links: any };
