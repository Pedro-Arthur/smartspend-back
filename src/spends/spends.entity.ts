import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';
import { BankCard } from 'src/bankCards/bankCards.entity';
import { Category } from 'src/categories/categories.entity';
import { SpendMethod } from 'src/spendMethods/spendMethods.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'spends' })
export class Spend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  value: number;

  @Column({ type: 'date', nullable: false })
  date: string;

  @ManyToOne(() => User, (user) => user.spends, { nullable: false })
  user: User;

  @ManyToOne(() => Category, (category) => category.spends, { nullable: false })
  category: Category;

  @ManyToOne(() => SpendMethod, (spendMethod) => spendMethod.spends, {
    nullable: false,
  })
  spendMethod: SpendMethod;

  @ManyToOne(() => BankCard, (bankCard) => bankCard.spends, {
    nullable: true,
  })
  bankCard: BankCard;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.spends, {
    nullable: true,
  })
  bankAccount: BankAccount;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
