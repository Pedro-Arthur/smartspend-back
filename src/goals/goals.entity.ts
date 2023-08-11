import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'goals' })
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  startDate: string;

  @Column({ type: 'date', nullable: false })
  endDate: string;

  @Column({ type: 'float', nullable: false })
  maxValue: number;

  @ManyToOne(() => User, (user) => user.codes, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
