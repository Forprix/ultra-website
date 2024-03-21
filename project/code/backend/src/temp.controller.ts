import { Controller, Get } from '@nestjs/common';
import { buildSchema, GraphQLSchema } from 'graphql';

@Controller('temp')
export class TempController {
  @Get('')
  async handle() {
    return 'Temporary!';
  }
}
