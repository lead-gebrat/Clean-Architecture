/*eslint-disable prettier/prettier*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateBookDto } from '../../application/dto/create-book.dto';
import { CreateBookUseCase } from '../../application/use-cases/create-book.use-case';
import { GetBooksUseCase } from '../../application/use-cases/get-books.use-case';
import { GetBookByIdUseCase } from '../../application/use-cases/get-book-by-id.use-case';
import { UpdateBookDto } from '../../application/dto/update-book.dto';
import { UpdateBookUseCase } from '../../application/use-cases/update-book.use-case';
import { DeleteBookUseCase } from '../../application/use-cases/delete-book.use-case';

@Controller('books')
export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
  ) {}

  @Get()
  async getAllBooks() {
    return this.getBooksUseCase.execute();
  }

  @Post()
  async createBook(@Body() book: CreateBookDto) {
    return this.createBookUseCase.execute(book);
  }

  @Get(':id')
  async getById(
    @Param()
    id: string,
  ) {
    return this.getBookByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param()
    id: string,
    @Body()
    book: UpdateBookDto,
  ) {
    return this.updateBookUseCase.execute(id, book);
  }

  @Delete(':id')
  async delete(
    @Param()
    id: string,
  ) {
    return this.deleteBookUseCase.execute(id);
  }
}
