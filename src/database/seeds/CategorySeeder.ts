import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from 'src/categories/categories.entity';

const categories = [
  { name: 'Lazer' },
  { name: 'Segurança' },
  { name: 'Alimentação' },
  { name: 'Transporte' },
  { name: 'Educação' },
  { name: 'Saúde' },
  { name: 'Moradia' },
  { name: 'Entretenimento' },
  { name: 'Vestuário' },
  { name: 'Viagem' },
  { name: 'Tecnologia' },
  { name: 'Higiene pessoal' },
  { name: 'Presentes' },
  { name: 'Doações' },
  { name: 'Impostos' },
  { name: 'Investimentos' },
  { name: 'Energia e Utilidades' },
  { name: 'Assinaturas e Serviços' },
];

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Category);
    await repository.insert(categories);
  }
}
