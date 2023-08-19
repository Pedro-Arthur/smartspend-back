import { BankCard } from 'src/bankCards/bankCards.entity';
import { Bank } from 'src/banks/banks.entity';
import { Spend } from 'src/spends/spends.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => BankCard, (bankCard) => bankCard.bankAccount)
  cards: BankCard[];

  @OneToMany(() => Spend, (spend) => spend.bankAccount)
  spends: Spend[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
