import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { graphql, buildSchema, GraphQLSchema } from 'graphql';

@Controller('graphql')
export class GraphQLController {
  schema: GraphQLSchema;
  constructor() {
    this.schema = buildSchema(`#graphql
      type Query {
        hello: String
      }
    `);
  }

  @Post('')
  async handle(@Body() body: any) {
    // await (await fetch('/graphql', { method: 'POST', body: '123' })).text()
    console.log(JSON.stringify(body));
    return 'КаЙФ!!!!';
  }
}
