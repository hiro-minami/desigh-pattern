import { Facory, Product } from "./framework";

// FrameWorkから分離することを明示するため、別のTSファイルにしている
class IDCard extends Product {
  private owner: string;
  constructor(owner: string) {
    super();
    console.log(`${owner}のカードを作ります`);
    this.owner = owner;
  }
  public use(): void {
    console.log(`${this}を使います`);
  }
  public toString(): string {
    return `[IDCard:"${this.owner}"]`;
  }
  public getOwner(): string {
    return this.owner;
  }
}

class IDCardFactory extends Facory {
  // 抽象メソッドの実装。Productをnewして返す
  public createProduct(owner: string): Product {
    return new IDCard(owner);
  }
  public registerProduct(product: Product): void {
    console.log(`${product}を登録しました`);
  }
}

export { IDCard, IDCardFactory };
