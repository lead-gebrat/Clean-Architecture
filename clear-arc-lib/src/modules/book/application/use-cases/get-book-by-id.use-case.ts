/*eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';

@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string): Promise<BookEntity | null> {
    return this.bookRepository.findById(id);
  }
}
