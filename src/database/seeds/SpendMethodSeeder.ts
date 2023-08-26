import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SpendMethod } from 'src/spendMethods/spendMethods.entity';

const spendMethods = [
  { name: 'Dinheiro', key: 'money' },
  { name: 'Cartão de Crédito', key: 'credit' },
  { name: 'Cartão de Débito', key: 'debit' },
  { name: 'Transferência Bancária', key: 'transfer' },
  { name: 'Boleto Bancário', key: 'ticket' },
  { name: 'PIX', key: 'pix' },
];

export default class SpendMethodSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(SpendMethod);
    await repository.insert(spendMethods);
  }
}
