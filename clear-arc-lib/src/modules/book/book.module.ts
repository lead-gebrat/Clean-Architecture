/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './infrastructure/schemas/book.schema';
import { CreateBookUseCase } from './application/use-cases/create-book.use-case';
import { GetBooksUseCase } from './application/use-cases/get-books.use-case';
import { BookController } from './presentation/controllers/book.controller';

import { BookRepositoryImpl } from './infrastructure/persistence/book.repository';
import { GetBookByIdUseCase } from './application/use-cases/get-book-by-id.use-case';
import { UpdateBookUseCase } from './application/use-cases/update-book.use-case';
import { DeleteBookUseCase } from './application/use-cases/delete-book.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [
    CreateBookUseCase,
    GetBooksUseCase,
    GetBookByIdUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
  ],
  exports: ['BookRepository'],
})
export class BookModule {}
