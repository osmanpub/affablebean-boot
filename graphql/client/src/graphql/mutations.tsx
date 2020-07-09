import gql from "graphql-tag";

export const SEND_FEEDBACK = gql`
  mutation contact(
    $name: String!
    $email: String!
    $msg: String!
    $subjectId: String!
  ) {
    contact(name: $name, email: $email, msg: $msg, subjectId: $subjectId) {
      success
    }
  }
`;
