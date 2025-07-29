import { graphql } from "~/graphql";

export const LOGIN_MUTATION = graphql(`
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

export const WHO_AM_I_QUERY = graphql(`
  query WhoAmI {
    whoAmI {
      id
      username
      email
      bio
      image
    }
  }
`);
