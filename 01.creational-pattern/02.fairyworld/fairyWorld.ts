class RandomHelper{
    public static setRanDouble(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public static ranBoolean(): boolean {
        return Math.floor(Math.random() * 10) % 2 === 0;
    }
}

class Name{
    private firstName: string
    private lastName: string
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public toString(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

class BMI {
    private heightM: number
    private weightKg: number
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
    protected species: string
    protected bmi: BMI
    protected lifeSpanDays: number
    protected biologicalSex: string
    protected spawnTime: Date
    protected deathTime: Date
    protected hungerPercent: number = 100
    protected sleepPercent: number = 100
    constructor(species: string, heightM: number, weightKg: number, lifeSpanDays: number, biologicalSex: string) {
        this.species = species;
        this.bmi = new BMI(heightM, weightKg);
        this.lifeSpanDays = lifeSpanDays;
        this.biologicalSex = biologicalSex;
        this.spawnTime = new Date();
    }
    public eat(): void {
        if(!this.isAlive()) return;
        this.hungerPercent = 0;
    }
    public setAsHungry(): void {
        if(!this.isAlive()) return;
        this.hungerPercent = 100;
    }
    public isHungry(): boolean {
        return this.hungerPercent >= 70;
    }
    public sleep(): void {
        if(!this.isAlive()) return;
        this.sleepPercent = 0;
    }
    public setAsSleep(): void {
        if(!this.isAlive()) return;
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
        return `${this.species} ${this.bmi} lives ${this.lifeSpanDays} days/gender: ${this.biologicalSex}. ${this.status()}`;
    }
    public status(): string {
        return `${this.species} status: Hunger - ${this.hungerPercent}%, sleepiness: ${this.sleepPercent}%, Alive - ${this.isAlive()}. First created at ${this.dateCreated()}`;
    }
    public dateCreated(): string {
        const date = this.spawnTime;
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}

class Mammal extends Animal {
    private bodyTemperatureC: number
    private avgBodyTemperature: number
    constructor(species: string, heightM: number, weightKg: number, lifeSpanDays: number, biologicalSex: string, avgBodyTemperature: number) {
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

class Person extends Mammal {
    private static readonly SPACIES = "Human"
    private static readonly LIFE_EXPECTANCY = 30000
    private static readonly BODY_TEMPERATURE = 36

    private name: Name
    private age: number
    constructor(firstName: string, lastName: string, age: number, heightM: number, weightKg: number, biologicalSex: string) {
        super(Person.SPACIES, heightM, weightKg, Person.LIFE_EXPECTANCY, biologicalSex, Person.BODY_TEMPERATURE);
        this.name = new Name(firstName, lastName);
        this.age = age;
    }
    public getName(): string {
        return this.name.toString();
    }
    public toString(): string {
        return `${super.toString()} The name of this person is ${this.getName()}.`;
    }
}

interface PlayfulPet {
    play(): string
    playWithPerson(person: Person): string
    playNoise(): string
    getPetname(): string
    getRentalCost(): number
    likesActivity(activity: string): boolean
    dislikesActivity(activity: string): boolean
    doActivity(activity: string): string
}

class Cat extends Mammal implements PlayfulPet {
    private static readonly SPECIES = "Cat"
    private static readonly LIFE_EXPECTANCY = 5500
    private static readonly BODY_TEMPERATURE = 37
    private static readonly PLAYFUL_HOURLY_COSTS: number = 50
    private static readonly LIKED_ACTIVITIES = ["eat","nap","groom","drink","crawl","explore","pet"]
    private static readonly DISLIKED_ACTIVITIES = ["bath"]
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
        return Cat.LIKED_ACTIVITIES.some(act => act === activity);
    }
    public dislikesActivity(activity: string): boolean {
        return Cat.DISLIKED_ACTIVITIES.some(act => act === activity);
    }
    public doActivity(activity: string): string {
        if(activity === "eat") {
            this.eat();
            return "The cat enjoyed eating food.";
        } else if(activity === "nap") {
            this.sleep();
            return "The cat took a good nap.";
        }
        else if(this.likesActivity(activity)) return `Meow. The cat really enjoyed the ${activity} activity.`;
        else if(this.dislikesActivity(activity)) return `The cat really hated at the ${activity} activity.`;
        else return `The cat felt indeferent about the ${activity} activity.`;
    }
}

abstract class PlayfulPetAssistant {
    protected static readonly DEFAULT_RENT_TIME: number = 1.0
    protected static readonly DEFAULT_TOUR = "all-rounder pack"
    protected currentPerson: Person
    protected currentRentTime: number = PlayfulPetAssistant.DEFAULT_RENT_TIME
    protected availableActivities: string[] = ["eat", "walk", "drink", "nap", "run", "explore"]
    protected availableTour: string[] = ["all-rounder pack", "deluxe rounder pack"]

    public getActivities(): string[] {
        return this.availableActivities;
    }
    public getAvailableTours(): string[] {
        return this.availableTour;
    }
    public isValidTour(tour: string): boolean {
        return this.availableTour.some(tourName => tourName === tour);
    }
    public getRandomActivity(): string {
        const randomIndex = RandomHelper.setRanDouble(0, this.availableActivities.length);
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
        this.currentPerson = null;
        this.currentRentTime = PlayfulPetAssistant.DEFAULT_RENT_TIME;
    }
    public runAssistanceTour(person: Person, tour?: string): number {
        // ツアーの情報を取得、引数にないならデフォルトのツアーがcurrentTourになる
        const currentTour = !tour ? "all-rounder pack" : tour;
        // ツアーが利用可能かどうか調べる
        if(!this.isValidTour(currentTour)) console.log(`Sorry, the tour guide does not accept the ${currentTour} tour.`);

        // Factory Methodを使ってPlayfulPetを生成
        const pet = this.createPlayfulPet();

        // 起動と遊び開始
        console.log("");
        console.log("Booting up... Playful Pet Assistance robot at your service");
        // ユーザーの情報を表示する
        console.log(`Printing information about the person to service... ${person}`);
        console.log("");
        // ペットの情報を表示する
        console.log(`Printing information about the PlayfulPet... ${pet.getPetname()} to service... ${pet}`);

        // tourの内容を確認してactivity開始
        if(currentTour === "all-rounder pack" || currentTour === "deluxe rounder pack") {
            const activityCount = currentTour === "all-rounder pack" ? 1 : 3;
            this.genericRounderTour(activityCount, person, pet)
        } 
        // 今後ツアーを拡張するときはelse ifを増やせば良い
        else {
            console.log(`The tour assistant robot for ${person.getName()} and ${pet.getPetname()} did nothing.`);
        }
        // レンタル料を計算する
        const rentalCosts = this.currentRentTime * pet.getRentalCost();
        // リセット
        this.reset();
        // レンタル料を返す
        return rentalCosts;
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
        for(let i=0; i<activityCount; i++) {
            // アクティビティをランダムに取得
            const activity = this.getRandomActivity();
            // 取得したアクティビティを表示
            console.log(`${petName} will now ${activity}`);
            // アクティビティ開始
            console.log(pet.doActivity(activity));
            console.log("----------");
        }
    }
    public abstract createPlayfulPet(): PlayfulPet
}

// 抽象クラスを作成した。その結果、Factory MethodであるcreatePlayfulPet()は具象クラスにて生成される
// これにより、オブジェクトの生成をサブクラスに権限を委ねている（抽象クラスはオブジェクトの生成ができない）
// 具象クラスで定義することのメインは、抽象クラスより権限を委ねられた「オブジェクトの生成」
class PlayfulCatAssistant extends PlayfulPetAssistant {
    public createPlayfulPet(): PlayfulPet {
        // Catの生成に必要な情報を生成する
        // Factory Methodを利用することで、オブジェクトの生成に必要な処理を隠蔽できる。これにより、クライアントは何も知らなくてもよくなる
        const heightM = RandomHelper.setRanDouble(0.15, 0.3);
        const weightKg = RandomHelper.setRanDouble(2.0, 4.9);
        const biologicalSex = RandomHelper.ranBoolean() ? "male" : "female";
        return new Cat(heightM, weightKg, biologicalSex);
    }
}

class FairyWorld {
    public rentPet(assistant: PlayfulPetAssistant, person: Person): void {
        console.log("Thank you for your pet rental!");
        // assistanceTour開始
        const costs = assistant.runAssistanceTour(person);
        // かかった費用を表示
        console.log(`${costs} dollars were charged to ${person.getName()}'s credit card.`);
        console.log("xxxxxxxxxx");
    }
}

// FairyWorld, Person, PlayfulPetAssistantの生成
const fairyWorld = new FairyWorld();
const jessica = new Person("Jassica", "Roller", 30, 1.65, 55, "female");
const catAssistant = new PlayfulCatAssistant();

fairyWorld.rentPet(catAssistant, jessica);