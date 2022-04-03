interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

interface Iterable<T> {
  iterator(): Iterator<T>;
}

class Book {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
}

class BookShelf implements Iterable<Book> {
  private books: Book[] = [];
  private last: number = 0;

  public getBookAt(index: number) {
    return this.books[index];
  }

  public appendBook(book: Book) {
    this.books.push(book);
    this.last++;
  }

  public getLength(): number {
    return this.last;
  }
  public iterator(): Iterator<Book> {
    return new BookShelfIterator(this);
  }
}

class BookShelfIterator implements Iterator<Book> {
  private bookShelf: BookShelf;
  private index: number = 0;

  constructor(bookShelf: BookShelf) {
    this.bookShelf = bookShelf;
  }

  public hasNext(): boolean {
    return this.index < this.bookShelf.getLength();
  }

  public next(): Book {
    const book = this.bookShelf.getBookAt(this.index);
    this.index++;
    return book;
  }
}

var bookShelf: BookShelf = new BookShelf();
bookShelf.appendBook(new Book("こころ"));
bookShelf.appendBook(new Book("人間失格"));
bookShelf.appendBook(new Book("君の名は"));
bookShelf.appendBook(new Book("ぐりとぐら"));

console.log("以下本棚の本");
var it: Iterator<Book> = bookShelf.iterator();

while (it.hasNext()) {
  console.log(it.next());
}
