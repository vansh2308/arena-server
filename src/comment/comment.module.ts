import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { Stage } from 'src/stages/entities/stage.entity';
import User from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Stage, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
