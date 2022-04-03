// // 必要とされるインターフェース
// interface Print {
//   printWeak(): void;
//   printStrong(): void;
// }

// // Adaptorの役割
// class PrintBanner extends Banner implements Print {
//   constructor(str: string) {
//     super(str);
//   }
//   // 親クラスのshowWithParenを呼び出す
//   public printWeak(): void {
//     this.showWithParen();
//   }
//   // 親クラスのshowWithAsterを呼び出す
//   public printStrong(): void {
//     this.showWithAster();
//   }
// }

// // Print型の変数にPrintBannerのインスタンスを代入している（抽象を使うため）
// // こうすることで、Main側は必要とされるインターフェースだけを知っている状態（メソッドの処理の中身は知らない）
// let p: Print = new PrintBanner("Hello");
// p.printStrong();
// p.printWeak();
