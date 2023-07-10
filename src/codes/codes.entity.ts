import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CodeTypeEnum } from './codes.enum';

@Entity({ name: 'codes' })
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  value: string;

  @Column({
    type: 'enum',
    enum: CodeTypeEnum,
    nullable: false,
  })
  type: CodeTypeEnum;

  @ManyToOne(() => User, (user) => user.codes, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
