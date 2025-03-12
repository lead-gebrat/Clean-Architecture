/*eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';

@Injectable()
export class GetBooksUseCase {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async execute(): Promise<BookEntity[]> {
    return this.bookRepository.findAll();
  }
}
