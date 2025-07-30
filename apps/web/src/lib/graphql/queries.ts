import { graphql } from "~/graphql";

export const articlesQueryDocument = graphql(`
  query articles {
    articles {
      id
      title
      description
      body
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
