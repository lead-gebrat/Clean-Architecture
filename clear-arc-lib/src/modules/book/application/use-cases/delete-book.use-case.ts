/*eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';

@Injectable()
export class DeleteBookUseCase {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string): Promise<BookEntity> {
    const deletedBook = await this.bookRepository.delete(id);
    if (!deletedBook) {
      throw new Error('Book not found');
    }
    return deletedBook;
  }
}
