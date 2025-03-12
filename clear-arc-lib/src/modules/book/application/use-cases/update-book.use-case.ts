/*eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string, book: UpdateBookDto): Promise<BookEntity | null> {
    const updatedBook = new BookEntity(
      id,
      book.title,
      book.description,
      book.author,
      book.price,
      book.category,
    );
    return this.bookRepository.update(id, updatedBook);
  }
}
