import { Facory, Product } from "./framework";
import { IDCard, IDCardFactory } from "./idcard";

const factory: Facory = new IDCardFactory();
const card1: Product = factory.create("Hirotaka Minamida");
const card2: Product = factory.create("Keiko");
const card3: Product = factory.create("Takayuki");

card1.use();
card2.use();
card3.use();
