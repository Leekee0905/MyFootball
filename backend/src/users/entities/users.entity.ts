import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;
  @Column({ unique: true, nullable: false })
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  password: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ unique: true, nullable: false })
  nickname: string;
  @Column({ nullable: false })
  birthday: string;
}
