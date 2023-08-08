import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { BankCardTypeEnum } from './bankCards.enum';

@Entity({ name: 'bank_cards' })
export class BankCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 4, nullable: false })
  lastFourNumbers: string;

  @Column({
    type: 'enum',
    enum: BankCardTypeEnum,
    nullable: false,
  })
  type: BankCardTypeEnum;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.cards, {
    nullable: false,
  })
  bankAccount: BankAccount;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
