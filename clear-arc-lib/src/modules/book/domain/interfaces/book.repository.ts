/* eslint-disable prettier/prettier */

import { BookEntity } from '../entities/book.entity';

export interface BookRepository {
  findAll(): Promise<BookEntity[]>;
  findById(id: string): Promise<BookEntity | null>;
  update(id: string, book: BookEntity): Promise<BookEntity | null>;
  delete(id: string): Promise<BookEntity | null>;
  create(book: BookEntity): Promise<BookEntity>;
}
