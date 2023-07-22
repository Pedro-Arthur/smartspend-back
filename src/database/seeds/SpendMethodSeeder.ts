import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SpendMethod } from 'src/spendMethods/spendMethods.entity';

const spendMethods = [
  { name: 'Dinheiro' },
  { name: 'Cartão de Crédito' },
  { name: 'Cartão de Débito' },
  { name: 'Transferência Bancária' },
  { name: 'Boleto Bancário' },
  { name: 'PIX' },
];

export default class SpendMethodSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(SpendMethod);
    await repository.insert(spendMethods);
  }
}
