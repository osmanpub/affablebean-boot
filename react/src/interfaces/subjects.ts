import { id } from "./id";

export interface Subjects {
  didInvalidate: boolean;
  isFetching: boolean;
  items: Array<SubjectState>;
}

export interface Subject {
  id: id;
  name: string;
}

export type SubjectState = Subject & { _links: any };
