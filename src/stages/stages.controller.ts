import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StagesService } from './stages.service';

@Controller('/api/stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: any) {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stagesService.findOne(id);
  }

  @Post(':id/like')
  likeStage(@Param('id') id: string, @Body() body: { user_id: string }) {
    return this.stagesService.likeStage(id, body.user_id);
  }

  @Post(':id/repost')
  repostStage(@Param('id') id: string, @Body() body: { user_id: string; message: string }) {
    return this.stagesService.repostStage(id, body.user_id, body.message);
  }
}
