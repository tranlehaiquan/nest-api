import { Field, ID, ObjectType } from '@nestjs/graphql';
import Tags from 'src/tags/tags.type';

@ObjectType()
class Articles {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  body: string;

  // list of tags
  @Field(() => [Tags])
  tags: Tags[];
}

export default Articles;
