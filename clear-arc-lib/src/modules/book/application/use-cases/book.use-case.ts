/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';

@Injectable()
export class BookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<BookEntity[]> {
    return this.bookRepository.findAll();
  }

  async getBookById(id: string): Promise<BookEntity | null> {
    return this.bookRepository.findById(id);
  }

  async createBook(book: BookEntity): Promise<BookEntity> {
    return this.bookRepository.create(book);
  }
}
