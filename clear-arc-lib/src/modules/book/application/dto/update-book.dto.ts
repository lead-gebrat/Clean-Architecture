/*eslint-disable prettier/prettier */

import { Category } from '../../infrastructure/schemas/book.schema';

export class UpdateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly category: Category;
  readonly price: number;
}
