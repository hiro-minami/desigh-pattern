class RandomHelper {
  public static setRanDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  public static ranBoolean(): boolean {
    return Math.floor(Math.random() * 10) % 2 === 0;
  }
}

class Name {
  private firstName: string;
  private lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  public toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class BMI {
  private heightM: number;
  private weightKg: number;
  constructor(heightM: number, weightKg: number) {
    this.heightM = heightM;
    this.weightKg = weightKg;
  }
  public getWeightKg(): number {
    return this.weightKg;
  }
  public getValue(): number {
    return this.weightKg / (this.heightM * this.heightM);
  }
  public toString(): string {
    return `${this.heightM} meters, ${this.weightKg} kg, BMI: ${this.getValue()}`;
  }
}

class Animal {
  protected species: string;
  protected bmi: BMI;
  protected lifeSpanDays: number;
  protected biologicalSex: string;
  protected spawnTime: Date;
  protected deathTime: Date | undefined;
  protected hungerPercent: number = 100;
  protected sleepPercent: number = 100;
  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string
  ) {
    this.species = species;
    this.bmi = new BMI(heightM, weightKg);
    this.lifeSpanDays = lifeSpanDays;
    this.biologicalSex = biologicalSex;
    this.spawnTime = new Date();
  }
  public eat(): void {
    if (!this.isAlive()) return;
    this.hungerPercent = 0;
  }
  public setAsHungry(): void {
    if (!this.isAlive()) return;
    this.hungerPercent = 100;
  }
  public isHungry(): boolean {
    return this.hungerPercent >= 70;
  }
  public sleep(): void {
    if (!this.isAlive()) return;
    this.sleepPercent = 0;
  }
  public setAsSleep(): void {
    if (!this.isAlive()) return;
    this.sleepPercent = 100;
  }
  public isSleepy(): boolean {
    return this.sleepPercent >= 70;
  }
  public die(): void {
    this.hungerPercent = 0;
    this.sleepPercent = 0;
    this.deathTime = new Date();
  }
  public isAlive(): boolean {
    return !this.deathTime;
  }
  public toString(): string {
    return `${this.species} ${this.bmi} lives ${this.lifeSpanDays} days/gender: ${
      this.biologicalSex
    }. ${this.status()}`;
  }
  public status(): string {
    return `${this.species} status: Hunger - ${this.hungerPercent}%, sleepiness: ${
      this.sleepPercent
    }%, Alive - ${this.isAlive()}. First created at ${this.dateCreated()}`;
  }
  public dateCreated(): string {
    const date = this.spawnTime;
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}

class Mammal extends Animal {
  private bodyTemperatureC: number;
  private avgBodyTemperature: number;
  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    avgBodyTemperature: number
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
    this.avgBodyTemperature = avgBodyTemperature;
    this.bodyTemperatureC = this.avgBodyTemperature;
  }
  public eat(): void {
    super.eat();
    console.log(`this ${this.species} is eating with its single lower jaw`);
  }
  public toString(): string {
    return `${super.toString()} ${this.mammalInformation()}`;
  }
  public mammalInformation(): string {
    return `This is a mammal with a temperature of ${this.bodyTemperatureC}.`;
  }
  public increaseBodyHeat(celcius: number): void {
    this.bodyTemperatureC += celcius;
  }
  public decreaseBodyHeat(celcius: number): void {
    this.bodyTemperatureC -= celcius;
  }
  public adjustBodyHeat(): void {
    this.bodyTemperatureC = this.avgBodyTemperature;
  }
}

interface Status {
  getHappiness(): number;
  setHappiness(percent: number): void;
  isHappiness(): boolean;
  getEnergy(): number;
  setEnergy(percent: number): void;
  isEnergy(): boolean;
  getNausea(): number;
  setNausea(percent: number);
  isNausea(): boolean;
  getBathroom(): number;
  setBathroom(percent: number): void;
  isBathroom(): boolean;
  getFrightful(): number;
  setFrightful(percent: number): void;
  isFrightful(): boolean;
}

class Person extends Mammal implements Status {
  private static readonly SPACIES = "Human";
  private static readonly LIFE_EXPECTANCY = 30000;
  private static readonly BODY_TEMPERATURE = 36;

  private name: Name;
  private age: number;

  private happiness: number = 4;
  private energy: number = 3;
  private nausea: number = 0;
  private bathroom: number = 0;
  private frightful: number = 0;
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    heightM: number,
    weightKg: number,
    biologicalSex: string
  ) {
    super(
      Person.SPACIES,
      heightM,
      weightKg,
      Person.LIFE_EXPECTANCY,
      biologicalSex,
      Person.BODY_TEMPERATURE
    );
    this.name = new Name(firstName, lastName);
    this.age = age;
  }
  public getName(): string {
    return this.name.toString();
  }
  public getAge(): number {
    return this.age;
  }
  public toString(): string {
    return `${super.toString()} The name of this person is ${this.getName()}.`;
  }
  public getHappiness(): number {
    return this.happiness;
  }
  public setHappiness(percent: number): void {
    this.happiness += percent;
  }
  public isHappiness(): boolean {
    return this.happiness >= 4;
  }
  public getEnergy(): number {
    return this.energy;
  }
  public setEnergy(percent: number): void {
    this.energy += percent;
  }
  public isEnergy(): boolean {
    return this.energy >= 4;
  }
  public getNausea(): number {
    return this.nausea;
  }
  public setNausea(percent: number) {
    this.nausea += percent;
  }
  public isNausea(): boolean {
    return this.nausea >= 4;
  }
  public getBathroom(): number {
    return this.bathroom;
  }
  public setBathroom(percent: number): void {
    this.bathroom += percent;
  }
  public isBathroom(): boolean {
    return this.bathroom >= 4;
  }
  public getFrightful(): number {
    return this.frightful;
  }
  public setFrightful(percent: number): void {
    this.frightful += percent;
  }
  public isFrightful(): boolean {
    return this.frightful >= 4;
  }
}

interface PlayfulPet {
  play(): string;
  playWithPerson(person: Person): string;
  playNoise(): string;
  getPetname(): string;
  getRentalCost(): number;
  likesActivity(activity: string): boolean;
  dislikesActivity(activity: string): boolean;
  doActivity(activity: string): string;
}

class Cat extends Mammal implements PlayfulPet {
  private static readonly SPECIES = "Cat";
  private static readonly LIFE_EXPECTANCY = 5500;
  private static readonly BODY_TEMPERATURE = 37;
  private static readonly PLAYFUL_HOURLY_COSTS: number = 50;
  private static readonly LIKED_ACTIVITIES = [
    "eat",
    "nap",
    "groom",
    "drink",
    "crawl",
    "explore",
    "pet",
  ];
  private static readonly DISLIKED_ACTIVITIES = ["bath"];
  constructor(height: number, weight: number, biologicalSex: string) {
    super(Cat.SPECIES, height, weight, Cat.LIFE_EXPECTANCY, biologicalSex, Cat.BODY_TEMPERATURE);
  }
  public toString(): string {
    return `${super.toString()} This is a cat.`;
  }
  public meow(): string {
    return "Meowww";
  }
  public getPetname(): string {
    return this.species;
  }
  public play(): string {
    return "This cat is rolling ont the floor, and pretends to play predator.";
  }
  public playWithPerson(person: Person): string {
    return `The cat starts at ${person.getName()}. After taking kin to ${person.getName()}, ${person.getName()} throws a mouse toy at this and the cat starts chasing the mouse toy.`;
  }
  public playNoise(): string {
    return this.meow();
  }
  public getRentalCost(): number {
    return Cat.PLAYFUL_HOURLY_COSTS;
  }
  public likesActivity(activity: string): boolean {
    return Cat.LIKED_ACTIVITIES.some((likedActivity) => likedActivity === activity);
  }
  public dislikesActivity(activity: string): boolean {
    return Cat.DISLIKED_ACTIVITIES.some((dislikedActivity) => dislikedActivity === activity);
  }
  public doActivity(activity: string): string {
    if (activity === "eat") {
      this.eat();
      return "The cat enjoyed eating food.";
    } else if (activity === "nap") {
      this.sleep();
      return "The cat took a good nap.";
    } else if (this.likesActivity(activity))
      return `Meow. The cat really enjoyed the ${activity} activity.`;
    else if (this.dislikesActivity(activity))
      return `The cat really hated at the ${activity} activity.`;
    else return `The cat felt indeferent about the ${activity} activity.`;
  }
}

// 拡張
// このシステムでは、ペットとペットのアシスタントを拡張できる
class Dog extends Mammal implements PlayfulPet {
  private static readonly SPACIES: string = "Dog";
  private static readonly LIFE_EXPECTANCY: number = 7000;
  private static readonly BODY_TEMPERATURE: number = 37;
  private static readonly PLAYFUL_HOURLY_COSTS: number = 100;
  private static LIKED_ACTIVITIES: string[] = ["eat", "nap", "run", "stand"];
  private static DISLIKED_ACTIVITIES: string[] = ["walk", "drink"];
  constructor(heightM: number, weightKg: number, biologicalSex: string) {
    super(Dog.SPACIES, heightM, weightKg, Dog.LIFE_EXPECTANCY, biologicalSex, Dog.BODY_TEMPERATURE);
  }
  public toString(): string {
    return `${super.toString()} This is a dog.`;
  }
  public bow(): string {
    return "bow";
  }
  public getPetname(): string {
    return this.species;
  }
  public play(): string {
    return "The dog is running around the playground.";
  }
  public playWithPerson(person: Person): string {
    return `The dog starts at ${person.getName()}. ${person.getName()} throws a dogfood and the dog runs to the dogfood.`;
  }
  public playNoise(): string {
    return this.bow();
  }
  public getRentalCost(): number {
    return Dog.PLAYFUL_HOURLY_COSTS;
  }
  public likesActivity(activity: string): boolean {
    return Dog.LIKED_ACTIVITIES.some((likedActivity) => likedActivity === activity);
  }
  public dislikesActivity(activity: string): boolean {
    return Dog.DISLIKED_ACTIVITIES.some((dislikedActivity) => dislikedActivity === activity);
  }
  public doActivity(activity: string): string {
    if (activity === "eat") {
      super.eat();
      return "The dog enjoyed eating.";
    } else if (activity === "nap") {
      super.sleep();
      return "The dog took a good nap.";
    } else if (this.likesActivity(activity))
      return `woooowwwww! The dog really enjoyed ${activity} activity.`;
    else if (this.dislikesActivity(activity))
      return `The dog really hated at ${activity} activity.`;
    else return `The dog felt indeferent about the ${activity} activity.`;
  }
}

// Rabbit
class Rabbit extends Mammal implements PlayfulPet {
  private static readonly SPACIES = "Bunny";
  private static readonly LIFE_EXPECTANCY = 5000;
  private static readonly BODY_TEMPERATURE = 37;
  private static readonly PLAYFUL_HOURLY_COSTS = 120;
  private static LIKED_ACTIVITIES = ["eat", "nap", "run", "jump"];
  private static DISLIKED_ACTIVITIES = ["stand"];
  constructor(heightM: number, weightKg: number, biologicalSex: string) {
    super(
      Rabbit.SPACIES,
      heightM,
      weightKg,
      Rabbit.LIFE_EXPECTANCY,
      biologicalSex,
      Rabbit.BODY_TEMPERATURE
    );
  }
  public toString(): string {
    return `${super.toString()} This is a rabbit.`;
  }
  public boing(): string {
    return "boing-boing";
  }
  public getPetname(): string {
    return this.species;
  }
  public play(): string {
    return "The rabbit is jumping.";
  }
  public playWithPerson(person: Person): string {
    return `The rabbit starts at ${person.getName()}. ${person.getName()} throws a carrot over ther and the rabbit chasing it.`;
  }
  public playNoise(): string {
    return this.boing();
  }
  public getRentalCost(): number {
    return Rabbit.PLAYFUL_HOURLY_COSTS;
  }
  public likesActivity(activity: string): boolean {
    return Rabbit.LIKED_ACTIVITIES.some((likedActivity) => likedActivity === activity);
  }
  public dislikesActivity(activity: string): boolean {
    return Rabbit.DISLIKED_ACTIVITIES.some((dislikedActivity) => dislikedActivity === activity);
  }
  public doActivity(activity: string): string {
    if (activity === "eat") {
      super.eat();
      return "The rabbit enjoyed eating.";
    } else if (activity === "nap") {
      super.sleep();
      return "The rabbit took a good nap.";
    } else if (this.likesActivity(activity))
      return `boing-boing!! The rabbit really likes the ${activity} activity.`;
    else if (this.dislikesActivity(activity))
      return `The rabbit really hate the ${activity} activity.`;
    else return `The rabbit felt indeferent about the ${activity} activity.`;
  }
}

abstract class PlayfulPetAssistant {
  protected static readonly DEFAULT_RENT_TIME: number = 1.0;
  protected static readonly DEFAULT_TOUR = "all-rounder pack";
  protected currentPerson: Person | undefined;
  protected currentRentTime: number = PlayfulPetAssistant.DEFAULT_RENT_TIME;
  protected availableActivities: string[] = ["eat", "walk", "drink", "nap", "run", "explore"];
  protected availableTour: string[] = ["all-rounder pack", "deluxe rounder pack"];

  public getActivities(): string[] {
    return this.availableActivities;
  }
  public getAvailableTours(): string[] {
    return this.availableTour;
  }
  public isValidTour(tour: string): boolean {
    return this.availableTour.some((tourName) => tourName === tour);
  }
  public getRandomActivity(): string {
    const randomIndex = Math.floor(RandomHelper.setRanDouble(0, this.availableActivities.length));
    return this.availableActivities[randomIndex];
  }
  // 依存性注入
  public setPerson(person: Person): void {
    this.currentPerson = person;
  }
  public setHours(hours: number) {
    this.currentRentTime = hours;
  }
  public getCurrentTime(): number {
    return this.currentRentTime;
  }
  public reset(): void {
    this.currentPerson = undefined;
    this.currentRentTime = PlayfulPetAssistant.DEFAULT_RENT_TIME;
  }
  public runAssistanceTour(person: Person, amount: number, tour?: string): number {
    // ツアーの情報を取得、引数にないならデフォルトのツアーがcurrentTourになる
    const currentTour = !tour ? "all-rounder pack" : tour;
    // ツアーが利用可能かどうか調べる
    if (!this.isValidTour(currentTour))
      console.log(`Sorry, the tour guide does not accept the ${currentTour} tour.`);

    // Factory Methodを使ってPlayfulPetを生成
    const pets = this.createPlayfulPets(amount);
    let totalCost: number = 0;

    // 起動と遊び開始
    console.log("");
    console.log("Booting up... Playful Pet Assistance robot at your service");
    // ユーザーの情報を表示する
    console.log(`Printing information about the person to service... ${person}`);
    console.log("");

    pets.forEach((pet) => {
      // ペットの情報を表示する
      console.log(
        `Printing information about the PlayfulPet... ${pet.getPetname()} to service... ${pet}`
      );
      // tourの内容を確認してactivity開始
      if (currentTour === "all-rounder pack" || currentTour === "deluxe rounder pack") {
        const activityCount = currentTour === "all-rounder pack" ? 1 : 3;
        this.genericRounderTour(activityCount, person, pet);
      }
      // 今後ツアーを拡張するときはelse ifを増やせば良い
      else {
        console.log(
          `The tour assistant robot for ${person.getName()} and ${pet.getPetname()} did nothing.`
        );
      }
      totalCost += this.currentRentTime * pets[0].getRentalCost();
    });
    // リセット
    this.reset();
    // レンタル料を返す
    return totalCost;
  }
  public genericRounderTour(activityCount: number, person: Person, pet: PlayfulPet): void {
    // ペットの名前とユーザーの名前
    const petName = pet.getPetname();
    const personName = person.getName();
    // ゲーム回数を表示
    console.log(`Now starting the generic rounder tour with ${activityCount} activity(s)`);
    // 挨拶
    console.log(`${personName} greets ${petName}`);
    // play(), playNoise(), playWithPerson(person)
    console.log(pet.play());
    console.log(pet.playNoise());
    console.log(pet.playWithPerson(person));
    // ゲーム開始
    for (let i = 0; i < activityCount; i++) {
      // アクティビティをランダムに取得
      const activity = this.getRandomActivity();
      // 取得したアクティビティを表示
      console.log(`${petName} will now ${activity}`);
      // アクティビティ開始
      console.log(pet.doActivity(activity));
      console.log("----------");
    }
  }
  public abstract createPlayfulPets(amount: number): PlayfulPet[];
}

// 抽象クラスを作成した。その結果、Factory MethodであるcreatePlayfulPet()は具象クラスにて生成される
// これにより、オブジェクトの生成をサブクラスに権限を委ねている（抽象クラスはオブジェクトの生成ができない）
// 具象クラスで定義することのメインは、抽象クラスより権限を委ねられた「オブジェクトの生成」
class PlayfulCatAssistant extends PlayfulPetAssistant {
  public createPlayfulPets(amount: number): PlayfulPet[] {
    let catList: Cat[] = [];
    for (let i = 0; i < amount; i++) {
      const heightM = RandomHelper.setRanDouble(0.15, 0.3);
      const weightKg = RandomHelper.setRanDouble(2.0, 4.9);
      const biologicalSex = RandomHelper.ranBoolean() ? "male" : "female";
      catList.push(new Cat(heightM, weightKg, biologicalSex));
    }
    return catList;
  }
}

class PlayfulDogAssistant extends PlayfulPetAssistant {
  public createPlayfulPets(amount: number): PlayfulPet[] {
    let dogList: Dog[] = [];
    for (let i = 0; i < amount; i++) {
      const heightM = RandomHelper.setRanDouble(0.3, 1.0);
      const weightKg = RandomHelper.setRanDouble(5, 10);
      const biologicalSex = RandomHelper.ranBoolean() ? "male" : "female";
      dogList.push(new Dog(heightM, weightKg, biologicalSex));
    }
    return dogList;
  }
}

class PlayfulBunnyAssistant extends PlayfulPetAssistant {
  public createPlayfulPets(amount: number): PlayfulPet[] {
    let bunnyList: Rabbit[] = [];
    for (let i = 0; i < amount; i++) {
      const heightM = RandomHelper.setRanDouble(0.2, 0.8);
      const weightKg = RandomHelper.setRanDouble(3, 7);
      const biologicalSex = RandomHelper.ranBoolean() ? "male" : "female";
      bunnyList.push(new Rabbit(heightM, weightKg, biologicalSex));
    }
    return bunnyList;
  }
}

class Invoice {
  private title: string;
  private totalCost: number;
  private petName: string;
  private amount: number;
  constructor(title: string, totalCost: number, petName: string, amount: number) {
    this.title = title;
    this.totalCost = totalCost;
    this.petName = petName;
    this.amount = amount;
  }
  public getTitle(): string {
    return this.title;
  }
  public getTotalCost(): number {
    return this.totalCost;
  }
  public getPetName(): string {
    return this.petName;
  }
  public getAmount(): number {
    return this.amount;
  }
  public toString(): string {
    return `Title: ${this.title}, Costs: ${this.totalCost}, Pet name: ${this.petName}, Amount: ${this.amount}`;
  }
}

class FairyWorld {
  private assistantMap: Map<string, PlayfulPetAssistant>;
  private invoiceList: Invoice[];
  constructor() {
    this.assistantMap = new Map();
    this.invoiceList = [];
  }
  public rentPet(petKey: string, person: Person, amount: number, tour: string): void {
    console.log("Thank you for your pet rental!");
    // assistantの取得
    const assistant = this.assistantMap.get(petKey);
    if (!assistant) {
      console.log("Sorry, The assistant you select is not here. Please choose another.");
      return;
    }
    const cost = assistant.runAssistanceTour(person, amount, tour);
    // かかった費用を表示
    console.log(`${cost} dollars were charged to ${person.getName()}'s credit card.`);
    this.makeInvoice(new Invoice(person.getName(), cost, petKey, amount));
    console.log("xxxxxxxxxx");
  }
  private makeInvoice(invoice: Invoice): void {
    this.invoiceList.push(invoice);
  }
  // 請求書のリストを返す
  public getRentedPetsInvoice(): string[] {
    let list: string[] = [];
    this.invoiceList.forEach((invoice) => list.push(invoice.toString()));
    return list;
  }
  // PlayfulPetAssistantを追加するメソッド
  public addPlayfulPetAssistant(key: string, playfulPetAssistant: PlayfulPetAssistant): void {
    if (!this.assistantMap.get(key)) this.assistantMap.set(key, playfulPetAssistant);
  }
  public rideAtraction(person: Person, rideExperience: RideExperience, state: StateOfAffairs) {
    console.log("Thank you for riding this atraction!");
    rideExperience.ride(person, state);
    console.log("xxxxxxxxxx");
  }
}

// RideExperience クラスを作成
abstract class RideExperience {
  public ride(person: Person, state: StateOfAffairs) {
    // Factory Methodを使ってアトラクションを生成する
    const atraction = this.createRide();
    // アトラクションのナレーション
    console.log(atraction.description());
    // 恐怖度、スリル度、満足度のデータを用いてPersonの心情を描写する
    if (atraction.getScarriness() > 4) {
      if (person.getAge()) {
        console.log("boooooooooohoooooooooo");
        person.setNausea(2);
        person.setFrightful(2);
        person.setBathroom(2);
      } else {
        console.log("I'm scared...");
        person.setNausea(1);
        person.setFrightful(1);
        person.setBathroom(1);
      }
    }
    if (atraction.getThrill() > 4) {
      console.log("Wooooo! This atraction is very Thrilling!!");
      person.setFrightful(1);
    }
    if (this.isFriendliness(person, atraction)) {
      console.log("Great! This atraction is very Friendliness!");
      person.setHappiness(1);
      person.setEnergy(1);
    }
  }
  private isFriendliness(person: Person, atraction: Atraction): boolean {
    return (
      (atraction.getAdultFriendliness() > 4 && person.getAge() > 20) ||
      (atraction.getTeenFriendliness() > 4 && person.getAge() > 9 && person.getAge() <= 19) ||
      (atraction.getKidFriendliness() && person.getAge() < 10)
    );
  }
  public abstract createRide(): Atraction;
}

class StateOfAffairs {
  private numOfPersons: number;
  private temperature: number;
  private decibel: number;
  private atmosphere: string;
  constructor(numOfPersons: number, temperature: number, decibel: number, atmosphere: string) {
    this.numOfPersons = numOfPersons;
    this.temperature = temperature;
    this.decibel = decibel;
    this.atmosphere = atmosphere;
  }
  public getTime(): string {
    const time = new Date();
    return `${time.getHours()}:${time.getMinutes}:${time.getSeconds}`;
  }
  public getDate(): string {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  public getNumOfPerson(): number {
    return this.numOfPersons;
  }
  public getTemperature(): number {
    return this.temperature;
  }
  public getDecibel(): number {
    return this.decibel;
  }
  public getAtmonphere(): string {
    return this.atmosphere;
  }
  public addNumOfPerson(count: number): void {
    this.numOfPersons += count;
  }
  public subNumOfPerson(count: number): void {
    this.numOfPersons -= count;
  }
  public addTemperature(celcius: number): void {
    this.temperature += celcius;
  }
  public subTemperature(celcius: number): void {
    this.temperature -= celcius;
  }
  public addDecibel(db: number): void {
    this.decibel += db;
  }
  public subDecibel(db: number): void {
    this.decibel -= db;
  }
  public changeAtmonphere(newAtmosphere: string): void {
    this.atmosphere = newAtmosphere;
  }
}

interface Atraction {
  getKidFriendliness(): StatusLevel;
  getTeenFriendliness(): StatusLevel;
  getAdultFriendliness(): StatusLevel;
  getScarriness(): StatusLevel;
  getThrill(): StatusLevel;
  getLaughter(): StatusLevel;
  getSightseeing(): StatusLevel;
  getComfortableness(): StatusLevel;
  getAverageSpeedM(): number;
  getMaximumSpeed(): number;
  getMaximumWeight(): number;
  getMinimumHeight(): number;
  getMaximumHeight(): number;
  getWarnings(): string;
  description(): string;
}

type StatusLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

class FamilyCoasters implements Atraction {
  private kidFriendliness: StatusLevel = 7;
  private teenFriendliness: StatusLevel = 5;
  private adultFriendliness: StatusLevel = 5;
  private scarriness: StatusLevel = 2;
  private thrill: StatusLevel = 4;
  private sightseeing: StatusLevel = 2;
  private laughter: StatusLevel = 5;
  private comfortableness: StatusLevel = 5;
  private averageSpeedM: number = 40;
  private maximumSpeed: number = 60;
  private maximumWeight: number = 90;
  private maximumHeight: number = 180;
  private minimumHeight: number = 100;
  private warnings: string =
    "This Coaster is a coaster that can raide with family. sometimes this coaster turn around and a little updown.";
  public getKidFriendliness(): StatusLevel {
    return this.kidFriendliness;
  }
  public getTeenFriendliness(): StatusLevel {
    return this.teenFriendliness;
  }
  public getAdultFriendliness(): StatusLevel {
    return this.adultFriendliness;
  }
  public getScarriness(): StatusLevel {
    return this.scarriness;
  }
  public getThrill(): StatusLevel {
    return this.thrill;
  }
  public getSightseeing(): StatusLevel {
    return this.sightseeing;
  }
  public getLaughter(): StatusLevel {
    return this.laughter;
  }
  public getComfortableness(): StatusLevel {
    return this.comfortableness;
  }
  public getAverageSpeedM(): number {
    return this.averageSpeedM;
  }
  public getMaximumSpeed(): number {
    return this.maximumSpeed;
  }
  public getMaximumWeight(): number {
    return this.maximumWeight;
  }
  public getMaximumHeight(): number {
    return this.maximumHeight;
  }
  public getMinimumHeight(): number {
    return this.minimumHeight;
  }
  public getWarnings(): string {
    return this.warnings;
  }
  public description(): string {
    return `This Family Coaster is ... ${this.descriveStatus()} ${this.descriveSpeed()} ${this.descriveCaution()}`;
  }
  private descriveStatus(): string {
    return `Friendriness for Kid: ${this.kidFriendliness}, Teenager: ${this.teenFriendliness}, Adults: ${this.adultFriendliness}. Scarriness: ${this.scarriness}, Thrill: ${this.thrill}, Sightseeing: ${this.sightseeing}, Laughter: ${this.laughter}, Comfortableness: ${this.comfortableness}`;
  }
  private descriveSpeed(): string {
    return `This atraction's AverageSpeed is ${this.averageSpeedM} and MaximumSpeed is ${this.maximumSpeed}.`;
  }
  private descriveCaution(): string {
    return `${this.warnings} This atraction can ride only Weight: under ${this.maximumWeight}, Height: between ${this.minimumHeight} and ${this.maximumHeight}`;
  }
}

// Factory Methodのみを実装するクラス
class RideFamilyCoasterExperience extends RideExperience {
  public createRide(): Atraction {
    return new FamilyCoasters();
  }
}

// FairyWorld, Person, PlayfulPetAssistantの生成
const fairyWorld = new FairyWorld();
const jessica = new Person("Jassica", "Roller", 40, 1.65, 55, "female");
const mike = new Person("Mike", "Roller", 42, 1.8, 70, "male");
const ann = new Person("Ann", "Roller", 14, 1.5, 40, "female");
const ken = new Person("Ken", "Roller", 8, 1.4, 40, "male");
const catAssistant = new PlayfulCatAssistant();
const dogAssistant = new PlayfulDogAssistant();
const bunnyAssistant = new PlayfulBunnyAssistant();
fairyWorld.addPlayfulPetAssistant("cat", catAssistant);
fairyWorld.addPlayfulPetAssistant("dog", dogAssistant);
fairyWorld.addPlayfulPetAssistant("bunny", bunnyAssistant);

// fairyWorld.rentPet("cat", jessica, 2, "deluxe rounder pack");
// console.log("##############");
// fairyWorld.rentPet("dog", jessica, 4, "all-rounder pack");
// console.log("##############");
// fairyWorld.rentPet("bunny", jessica, 5, "all-rounder pack");

const familyCoaster = new RideFamilyCoasterExperience();
const states = new StateOfAffairs(
  RandomHelper.setRanDouble(1, 10000),
  RandomHelper.setRanDouble(0, 38),
  RandomHelper.setRanDouble(0, 120),
  RandomHelper.ranBoolean() ? "feeling good" : "scareing"
);
fairyWorld.rideAtraction(jessica, familyCoaster, states);
