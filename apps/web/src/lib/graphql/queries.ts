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
