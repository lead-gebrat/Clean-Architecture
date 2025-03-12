/*eslint-disable prettier/prettier */

export class BookEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public author: string,
    public price: number,
    public category: string,
  ) {}
}
