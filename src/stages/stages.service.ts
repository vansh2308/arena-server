// import { Injectable } from '@nestjs/common';
// import { CreateStageDto } from './dto/create-stage.dto';
// import { UpdateStageDto } from './dto/update-stage.dto';

// @Injectable()
// export class StagesService {
//   create(createStageDto: CreateStageDto) {

//     return 'This action adds a new stage';
//   }

//   findAll() {

//     return `This action returns all stages`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} stage`;
//   }

//   update(id: number, updateStageDto: UpdateStageDto) {
//     return `This action updates a #${id} stage`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} stage`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './entities/stage.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository: Repository<Stage>,
    
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(createStageDto: any) {
    const stage = this.stageRepository.create(createStageDto);
    return this.stageRepository.save(stage);
  }

  findAll() {
    return this.stageRepository.find();
  }

  findOne(id: string) {
    return this.stageRepository.findOne({ where: { stage_id: id } });
  }

  update(id: string, updateStageDto: any) {
    return this.stageRepository.update(id, updateStageDto);
  }

  remove(id: string) {
    return this.stageRepository.delete(id);
  }

  // Like the stage
  async likeStage(stage_id: string, user_id: string) {
    const stage = await this.stageRepository.findOne({ where: { stage_id } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    // Increment the like count
    stage.likes_count += 1;
    await this.stageRepository.save(stage);

    return {
      message: 'Stage liked successfully.',
      likes_count: stage.likes_count,
    };
  }

  // Repost the stage
  async repostStage(stage_id: string, user_id: string, message: string) {
    const stage = await this.stageRepository.findOne({ where: { stage_id } });
    if (!stage) {
      throw new Error('Stage not found');
    }

    // Increment the repost count
    stage.reposts_count += 1;
    await this.stageRepository.save(stage);

    return {
      message: 'Stage reposted successfully.',
      reposts_count: stage.reposts_count,
    };
  }
}
