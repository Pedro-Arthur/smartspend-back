import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';
import { BankCard } from 'src/bankCards/bankCards.entity';
import { Category } from 'src/categories/categories.entity';
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
  withGoogle?: boolean | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  hasAcceptedTerms?: boolean | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  hasConfirmedEmail?: boolean | null;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  pictureUrl?: string | null;

  @OneToMany(() => Code, (code) => code.user)
  codes: Code[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => BankAccount, (account) => account.user)
  accounts: BankAccount[];

  @OneToMany(() => BankCard, (bankCard) => bankCard.user)
  cards: BankCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
