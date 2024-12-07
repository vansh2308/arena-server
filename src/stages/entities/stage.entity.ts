import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  stage_id: string;

  @Column()
  stage_name: string;

  @Column()
  host_user_id: string;

  @Column({ type: 'timestamptz' })
  scheduled_time: Date;

  @Column({ default: 'scheduled' })
  status: string;

  @OneToMany(() => Comment, comment => comment.stage)
  comments: Comment[];

  @Column({ default: 0 })
  likes_count: number;

  @Column({ default: 0 })
  reposts_count: number;
}
