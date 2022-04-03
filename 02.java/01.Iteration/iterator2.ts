// IteratorとIterableはすでにTypeScript側で定義済み

// menuを表示するアプリケーションを作成する。追加機能として、そのmenuが今もあるかどうかを返す
// Iteratorを実装したConcreteIteratorとIterableを実装したConcreteIterable、Objectを生成してあげる
class MenuShelf implements Iterable<Menu> {
  // メニューの棚
  private menus: Menu[];
  private last: number = 0;
  constructor() {
    this.menus = [];
  }
  // indexの位置にある値を取得
  public getMenuAt(index: number) {
    return this.menus[index];
  }
  // メニューを追加する
  public appendMenu(menu: Menu) {
    this.menus.push(menu);
    this.last++;
  }
  // 長さを取得する
  public getLength(): number {
    return this.last;
  }
  // iteratorを生成
  public iterator(): Iterator<Menu, any, undefined> {
    return new MenuShelfIterator(this);
  }
}

class MenuShelfIterator implements Iterator<Menu> {
  private menuShelf: MenuShelf;
  private index: number = 0;
  constructor(menuShelf: MenuShelf) {
    this.menuShelf = menuShelf;
  }
  // 次の要素を取得できるかどうか判定
  // this.indexがmenuShelf.lengthより小さい場合、次の要素がある
  public hasNext(): boolean {
    return this.index < this.menuShelf.getLength();
  }
  public next(): Menu {
    if (!this.hasNext) {
      console.error("no shch element");
      return;
    }
    const menu = this.menuShelf.getMenuAt(this.index);
    this.index++;
    return menu;
  }
}

class Menu {
  private name: string;
  private canMake: boolean;
  constructor(name: string, canMake: boolean) {
    this.name = name;
    this.canMake = canMake;
  }
  public getName(): string {
    return this.name;
  }
  public getCanMake(): boolean {
    return this.canMake;
  }
  public toString(): string {
    return `name: ${this.getName()}, can eat: ${this.getCanMake()}`;
  }
}

let menuShelf = new MenuShelf();
menuShelf.appendMenu(new Menu("パフェ", true));
menuShelf.appendMenu(new Menu("ケーキ", true));
menuShelf.appendMenu(new Menu("チョコ", false));
menuShelf.appendMenu(new Menu("フロマージュ", true));
menuShelf.appendMenu(new Menu("コーヒー", true));
menuShelf.appendMenu(new Menu("ラテ", false));
menuShelf.appendMenu(new Menu("パンケーキ", false));
menuShelf.appendMenu(new Menu("煎茶", true));

let menuShelfIterator = menuShelf.iterator();

while (menuShelfIterator.hasNext()) {
  console.log(menuShelfIterator.next().toString());
}
