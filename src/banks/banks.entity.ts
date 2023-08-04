import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'banks' })
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 3, nullable: false, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @OneToMany(() => BankAccount, (account) => account.bank)
  accounts: BankAccount[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
