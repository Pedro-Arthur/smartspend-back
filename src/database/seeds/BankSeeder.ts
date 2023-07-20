import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Bank } from 'src/banks/banks.entity';

export default class BankSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Bank);
    await repository.insert([
      {
        code: 'aaa',
        name: 'bbbbbbbb',
      },
    ]);
  }
}
