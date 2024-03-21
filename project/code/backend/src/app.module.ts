import { Module } from '@nestjs/common';
import { GraphQLController } from './graphql.controller';
import { LanguageService } from './language/language.service';
import { TempController } from './temp.controller';

@Module({
  imports: [],
  controllers: [GraphQLController, TempController],
  providers: [LanguageService],
})
export class AppModule {}
