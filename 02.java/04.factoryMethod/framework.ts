abstract class Facory {
  // Template Method。createProductとregisterProductはサブクラスに実装を委ねている
  public create(owner: string) {
    const p: Product = this.createProduct(owner);
    this.registerProduct(p);
    return p;
  }
  public abstract createProduct(owner: string): Product;
  public abstract registerProduct(product: Product): void;
}

// 製品を表したクラス
abstract class Product {
  public abstract use(): void;
}

export { Facory, Product };
