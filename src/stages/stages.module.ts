import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { Stage } from './entities/stage.entity'; // import the Stage entity
import { Comment } from 'src/comment/entities/comment.entity'; // import the Comment entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage, Comment]), // make sure both entities are included
  ],
  providers: [StagesService],
  controllers: [StagesController],
})
export class StagesModule {}
