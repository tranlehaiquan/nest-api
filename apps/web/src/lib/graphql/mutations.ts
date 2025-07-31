import { graphql } from "~/graphql";

export const LOGIN_MUTATION = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      bio
      image
      token
    }
  }
`);

export const REGISTER_MUTATION = graphql(`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
      bio
      image
    }
  }
`);
