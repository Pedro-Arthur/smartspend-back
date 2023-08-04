import { Bank } from 'src/banks/banks.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bank_accounts' })
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  number: string;

  @Column({ type: 'char', length: 1, nullable: false })
  digit: string;

  @Column({ type: 'char', length: 4, nullable: false })
  agency: string;

  @ManyToOne(() => Bank, (bank) => bank.accounts, { nullable: false })
  bank: Bank;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
