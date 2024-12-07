import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import User from 'src/users/user.entity';  // Adjust the import path if needed
import { Stage } from 'src/stages/entities/stage.entity';  // Adjust the import path if needed

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @ManyToOne(() => User, user => user.username)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Stage, stage => stage.comments)
  @JoinColumn({ name: 'stage_id' })
  stage: Stage;

  @Column()
  comment_text: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Self join for nested comments (comment on comment)
  @ManyToOne(() => Comment, comment => comment.children)
  @JoinColumn({ name: 'parent_comment_id' })
  parent_comment: Comment;

  @OneToMany(() => Comment, comment => comment.parent_comment)
  children: Comment[];
}
