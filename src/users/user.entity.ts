import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
class User {
    @PrimaryColumn({unique: true})
    username: string;

    @Column()
    password: string;

}

export default User;