/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from '../../domain/interfaces/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(book: BookEntity): Promise<BookEntity> {
    const createdBook = await this.bookModel.create(book);
    const { _id, ...rest } = createdBook.toObject();
    return { id: _id.toString(), ...rest } as BookEntity;
  }

  async findAll(): Promise<BookEntity[]> {
    const books = await this.bookModel.find().lean();
    return books.map((book) => ({ id: book._id.toString(), ...book }));
  }

  async findById(id: string): Promise<BookEntity> {
    if (typeof id === 'object' && id !== null && 'id' in id) {
      id = (id as { id: string }).id;
    }

    if (!Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new NotFoundException('Invalid Book ID');
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const { _id, ...rest } = book.toObject();
    return { id: _id.toString(), ...rest } as BookEntity;
  }

  async update(id: string, book: BookEntity): Promise<BookEntity> {
    if (typeof id === 'object' && id !== null && 'id' in id) {
      id = (id as { id: string }).id;
    }

    if (!Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new NotFoundException('Invalid Book ID');
    }
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .lean();
    if (!updatedBook) throw new Error('Book not found');
    const { _id, ...rest } = updatedBook;
    return { id: _id.toString(), ...rest } as BookEntity;
  }

  async delete(id: string): Promise<BookEntity | null> {
    if (typeof id === 'object' && id !== null && 'id' in id) {
      id = (id as { id: string }).id;
    }

    if (!Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new NotFoundException('Invalid Book ID');
    }
    const deletedBook = await this.bookModel.findByIdAndDelete(id).lean();
    if (!deletedBook) return null;
    const { _id, ...rest } = deletedBook;
    return { id: _id.toString(), ...rest } as BookEntity;
  }
}
