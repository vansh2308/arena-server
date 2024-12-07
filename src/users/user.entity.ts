import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") 
  id: number;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;
}