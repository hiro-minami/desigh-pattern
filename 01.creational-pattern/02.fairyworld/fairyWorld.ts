class RandomWrapper {
    public static getRanDouble(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    public static ranBoolean() {
        return Math.random() * 10 > 5;
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
    public getHeightM(): number {
        return this.heightM;
    }
    public getWeightKg(): number {
        return this.weightKg;
    }
    public getBmi(): number {
        return this.weightKg / Math.pow(this.heightM, 2);
    }
    public toString(): string {
        return `${this.heightM} meters, ${this.weightKg}kg, BMI: ${this.getBmi()}`;
    }
}

class Animal {
    protected species: string;
    protected bmi: BMI;
    protected lifeSpanDays: number;
    protected biologicalSex: string;
    protected spawnTime: Date;
    protected deathTime: Date;
    protected hungerPercent = 100;
    protected sleepPercent = 100;
    constructor(species: string, heightM: number, weightKg: number, lifeSpanDays: number, biologicalSex: string) {
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
    public setAsSleepy(): void {
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
    public status(): string {
        return `${this.species} status: Hunger - ${this.hungerPercent}%, sleepness:${this.sleepPercent}%, Alive - ${this.isAlive()}. First created at ${this.dateCreated()}`;
    }
    public dateCreated(): string {
        const date = this.spawnTime;
        return `${date.getFullYear()}/${date.getMonth()}/${date.getSeconds()}`;
    }
}

class Mammal extends Animal {
    private bodyTemperatureC: number;
    private avgbodyTemperatureC: number;
    constructor(species: string, heightM: number, weightKg: number, lifeSpanDays: number, biologicalSex: string, avgBodyTemperatureC: number) {
        super(species, heightM, weightKg, lifeSpanDays, biologicalSex);
        this.bodyTemperatureC = avgBodyTemperatureC;
        this.avgbodyTemperatureC = avgBodyTemperatureC;
    }
    public eat(): void {
        super.eat();
        console.log(`This ${this.species} is eating with its single lower jaw`);
    }
    public toString() {
        return `${super.toString()} ${this.mammalInformation()}`;
    }
    public increaseBodyHeat(celcius: number): void {
        this.bodyTemperatureC += celcius;
    }
    public decreaseBodyHeat(celcius: number): void {
        this.bodyTemperatureC -= celcius;
    }
    public adjustBodyHeat(): void {
        this.bodyTemperatureC = this.avgbodyTemperatureC;
    }
    public mammalInformation(): string {
        return `This is a mammal with a temperature of: ${this.bodyTemperatureC}`;
    }
}

class Person extends Mammal {
    public static readonly SPECIES: string = "Human";
    public static readonly LIFE_EXPECTANCY: number = 30000;
    public static readonly BODY_TEMPERATURE: number = 36;
    private name: Name;
    private age: number;
    constructor(firstName: string, lastName: string, age: number, heightM: number, weightKg: number, biologicalSex: string) {
        super(Person.SPECIES, heightM, weightKg, Person.LIFE_EXPECTANCY, biologicalSex, Person.BODY_TEMPERATURE);
        this.name = new Name(firstName, lastName);
        this.age = age;
    }
    public getName(): string {
        return this.name.toString();
    }
    public toString(): string {
        return `${super.toString()}. The name of this person is ${this.getName()}`;
    }
}

interface PlayfulPet {
    play(): string;
    playWithPerson(person: Person): string;
    playNoise(): string;
    getPetName(): string;
    getRentalCosts(): number;
    likesActivity(activity: string): boolean;
    dislikesActivity(activity: string): boolean;
    doActivity(activity: string): string;
}

class Cat extends Mammal implements PlayfulPet {
    public static readonly SPECIES = "Cat";
    public static readonly LIFE_EXPECTANCY: number = 5500;
    public static readonly BODY_TEMPERATURE: number = 37;

    public static readonly PLAYFUL_HOURLY_COSTS: number = 50;
    public static readonly LIKED_ACTIVITIES: string[] = ["eat", "nap", "groom", "drink", "crawl", "explore", "pet"];
    public static readonly DISLIKED_ACTIVITIES: string[] = ["bath"];
    constructor(heightM: number, weightKg: number, biologicalSex: string) {
        super(Cat.SPECIES, heightM, weightKg, Cat.LIFE_EXPECTANCY, biologicalSex, Cat.BODY_TEMPERATURE);
    }
    public toString(): string {
        return `${super.toString()} this is a cat`;
    }
    public meow(): void {
        console.log("Meooow");
    }
    public getPetName(): string {
        return this.species;
    }
    public play(): string {
        return "This cat starts rolling on the floor, and pretends to play predator";
    }
    public playWithPerson(person: Person): string {
        return `The cat stares at ${person.getName()}. After taking kin to ${person.getName()}, ${person.getName()} throws a mouse toy at this cat and the cat starts chasing the mouse toy.`;
    }
    public playNoise(): string {
        return "Meooow";
    }
    public getRentalCosts(): number {
        return Cat.PLAYFUL_HOURLY_COSTS;
    }
    public likesActivity(activity: string): boolean {
        return Cat.LIKED_ACTIVITIES.findIndex((value) => value === activity) >= 0;
    }
    public dislikesActivity(activity: string): boolean {
        return Cat.DISLIKED_ACTIVITIES.findIndex((value) => value === activity) >= 0;
    }
    public doActivity(activity: string): string {
        // eatとnapは特別
        if (activity === "eat") {
            super.eat();
            return "The cat enjoyed eating food.";
        } else if (activity === "nap") {
            super.sleep();
            return "The cat took a good nap.";
        } else if (this.likesActivity(activity)) return `Meoow. The cat really enjoyed the ${activity}.`;
        else return `The cat felt indiferent about the ${activity}`;
    }
}

// このクラスにはPlayfulPetクラスを作成するための抽象クラスが存在する
// factory methodはあるクラスのインスタンス作成を他のクラスに委ねるデザインパターン
abstract class PlayfulPetAssistant {
    protected static readonly DEFAULT_RENT_TIME: number = 1.0;
    protected static readonly DEFAULT_TOUR: string = "all-rounder pack";

    protected currentPerson: Person;
    protected currentRentTime: number = PlayfulPetAssistant.DEFAULT_RENT_TIME;
    protected static availableActivities: string[] = ["eat", "walk", "drink", "nap", "pet", "run", "explore"];
    protected static availableTours: string[] = ["all-rounder pack", "deluxe rounder pack"];

    public getActivities(): string[] {
        return PlayfulPetAssistant.availableActivities;
    }
    public getAvailableTours(): string[] {
        return PlayfulPetAssistant.availableTours;
    }
    public isValidTour(tour: string): boolean {
        return PlayfulPetAssistant.availableTours.findIndex((value) => value === tour) >= 0;
    }
    public getRandomActivity(): string {
        const activities = PlayfulPetAssistant.availableActivities;
        return activities[RandomWrapper.getRanDouble(0, activities.length - 1)];
    }
    public setPerson(person: Person): void {
        this.currentPerson = person;
    }
    public setHours(hours: number): void {
        this.currentRentTime = hours;
    }
    public getCurrentRentTime(): number {
        return this.currentRentTime;
    }
    public reset(): void {
        this.currentPerson = undefined;
        this.currentRentTime = PlayfulPetAssistant.DEFAULT_RENT_TIME;
    }
    // ここでfactoruy methodを呼んでいる
    runAssistanceTour(person: Person);
    runAssistanceTour(person: Person, tour: string);
    public runAssistanceTour(person: Person, tour?: string) {
        if (!tour) return this.runAssistanceTour(person, PlayfulPetAssistant.DEFAULT_TOUR);

        if (!this.isValidTour(tour)) {
            console.log(`The tour guide does not accept the ${tour} tour.`);
            return;
        }
        // factory methodを実行。サブクラスは、抽象メソッドであるcreatePlayfulPetを拡張することで特定のペットを作成することができる
        const playfulPet: PlayfulPet = this.createPlayfulPet();

        console.log("Booting up... Playful Pet Assistance robot at your service.");
        console.log(`Printing information about the Person to service... ${person}`);
        console.log(`Printing information about the Playful Pet - ${playfulPet.getPetName()} to service... ${playfulPet}`);

        if (tour === "all-rounder pack" || tour === "deluxe rounder pack") {
            let count = tour === "all-rounder pack" ? 1 : 3;
            this.genericRounderTour(count, person, playfulPet);
        } else {
            // 該当しないツアーがあった場合
            console.log(`The tour assistant robot for ${playfulPet.getPetName()} and ${person.getName()} did nothing.`);
        }

        // costを計算する
        const rentalCosts = playfulPet.getRentalCosts() * this.getCurrentRentTime();

        // アシスタントを終了する
        this.reset();

        // costを返す
        return rentalCosts;
    }
    public genericRounderTour(activityCount: number, person: Person, pet: PlayfulPet) {
        console.log(`Now starting the generic rounder tour with ${activityCount} activity(s)`);
        console.log(`${person.getName()} greets ${pet.getPetName()}`);
        console.log(pet.play());
        console.log(pet.playNoise());
        console.log(pet.playWithPerson(person));
        for (let i = 0; i < activityCount; i++) {
            const activity = this.getRandomActivity();
            console.log(`${pet.getPetName()} will now ${activity}`);
            console.log("--------");
            console.log(pet.doActivity(activity));
            console.log("--------");
        }
    }
    public abstract createPlayfulPet(): PlayfulPet;
}

// PlayfulPetAssistantから具象クラスを作成する
// factory methodは、オブジェクトの作成をサブクラスに委ねることを覚えておく
class PlayfulCatAssistant extends PlayfulPetAssistant {
    public createPlayfulPet(): PlayfulPet {
        return new Cat(RandomWrapper.getRanDouble(0.15, 0.3), RandomWrapper.getRanDouble(2.0, 4.9), RandomWrapper.ranBoolean() ? "male" : "female");
    }
}

class FairyWorld {
    public rentPet(assistant: PlayfulPetAssistant, person: Person) {
        console.log("Thank you for your pet rental!");
        const costs = assistant.runAssistanceTour(person);
        console.log(`${costs} dollers were charged to ${person.getName()}'s credit card.`);
        console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    }
}

const fairyWorld = new FairyWorld();
const jessica = new Person("Jessica", "Roller", 30, 1.65, 95, "female");
fairyWorld.rentPet(new PlayfulCatAssistant(), jessica);
