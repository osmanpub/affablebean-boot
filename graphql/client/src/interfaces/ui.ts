export default interface UI {
  formErrors: Array<FormErrors>;
  home: boolean;
}

export interface FormErrors {
  msg: string;
  param: string;
  value: string;
}
