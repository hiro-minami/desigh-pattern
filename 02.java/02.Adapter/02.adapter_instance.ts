// Adaptee役
class Banner {
  private str: string;
  constructor(str: string) {
    this.str = str;
  }
  public showWithParen() {
    console.log(`(${this.str})`);
  }
  public showWithAster() {
    console.log(`*${this.str}*`);
  }
}

// このケースならインターフェースでもいいのでは？
// Target役
abstract class Print {
  public abstract printWeak(): void;
  public abstract printStrong(): void;
}

// Adapter役
class PrintBanner extends Print {
  // 提供されているクラスのインスタンスを保持
  private banner: Banner;
  constructor(banner: Banner) {
    super();
    this.banner = banner;
  }
  public printWeak(): void {
    // 実際の処理をインスタンスに委譲している
    this.banner.showWithParen();
  }
  public printStrong(): void {
    // 実際の処理をインスタンスに委譲している
    this.banner.showWithAster();
  }
}

// Client役
let p: Print = new PrintBanner(new Banner("hello"));
p.printStrong();
p.printWeak();
