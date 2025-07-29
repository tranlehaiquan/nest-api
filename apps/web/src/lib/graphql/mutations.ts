import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      bio
      image
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
      bio
      image
    }
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      username
      email
      bio
      image
    }
  }
`;
