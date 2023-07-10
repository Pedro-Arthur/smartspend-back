import { Code } from 'src/codes/codes.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  withGoogle: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  hasAcceptedTerms: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  hasConfirmedEmail: boolean;

  @OneToMany(() => Code, (code) => code.user)
  codes: Code[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
