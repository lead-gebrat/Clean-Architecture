/*eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async execute(dto: CreateBookDto): Promise<BookEntity> {
    const book = new BookEntity(
      '',
      dto.title,
      dto.description,
      dto.author,
      dto.price,
      dto.category,
    );
    return this.bookRepository.create(book);
  }
}
