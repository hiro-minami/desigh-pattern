abstract class AbstractDisplay {
  public abstract open(): void;
  public abstract print(): void;
  public abstract close(): void;
  // Template Method。処理の枠を決めている
  // それぞれの処理が具体的に何をしているのかはサブクラスで定義する
  public display() {
    this.open();
    for (let i = 0; i < 5; i++) {
      this.print();
    }
    this.close();
  }
}

class CharDisplay extends AbstractDisplay {
  private ch: string;
  constructor(ch: string) {
    super();
    this.ch = ch;
  }
  public open(): void {
    console.log("<<");
  }
  public print(): void {
    console.log(this.ch);
  }
  public close(): void {
    console.log(">>");
  }
}

class StringDisplay extends AbstractDisplay {
  private str: string;
  private width: number;
  constructor(str: string) {
    super();
    this.str = str;
    this.width = str.length;
  }
  public open(): void {
    this.printLine();
  }
  public print(): void {
    console.log(`|${this.str}|`);
  }
  public close(): void {
    this.printLine();
  }
  public printLine(): void {
    let line = "+";
    for (let i = 0; i < this.width; i++) {
      line += "-";
    }
    console.log(line + "+");
  }
}

// "H"を持ったCharDisplayのインスタンス生成
let d1: AbstractDisplay = new CharDisplay("H");

// "Hello World"を持ったStringDisplayのインスタンス生成
let d2: AbstractDisplay = new StringDisplay("Hello World");

// AbstractDisplayのインスタンスなので継承したdisplayメソッドを利用可能
// 実際のdisplayメソッドの動きは各インスタンスによって分かれる
d1.display();
d2.display();
