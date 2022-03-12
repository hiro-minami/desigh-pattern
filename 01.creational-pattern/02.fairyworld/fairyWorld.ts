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
    protected deathTime: Date | undefined
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
        return Cat.LIKED_ACTIVITIES.some(likedActivity => likedActivity === activity);
    }
    public dislikesActivity(activity: string): boolean {
        return Cat.DISLIKED_ACTIVITIES.some(dislikedActivity => dislikedActivity === activity);
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

// 拡張
// このシステムでは、ペットとペットのアシスタントを拡張できる
class Dog extends Mammal implements PlayfulPet {
    private static readonly SPACIES: string = "Dog"
    private static readonly LIFE_EXPECTANCY: number = 7000
    private static readonly BODY_TEMPERATURE: number = 37
    private static readonly PLAYFUL_HOURLY_COSTS: number = 100
    private static LIKED_ACTIVITIES: string[] = ["eat", "nap", "run", "stand"]
    private static DISLIKED_ACTIVITIES: string[] = ["walk", "drink"]
    constructor(heightM: number, weightKg: number, biologicalSex: string) {
        super(Dog.SPACIES, heightM, weightKg, Dog.LIFE_EXPECTANCY, biologicalSex, Dog.BODY_TEMPERATURE);
    }
    public toString(): string {
        return `${super.toString()} This is a dog.`
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
        return `The dog starts at ${person.getName()}. ${person.getName()} throws a dogfood and the dog runs to the dogfood.`
    }
    public playNoise(): string {
        return this.bow();
    }
    public getRentalCost(): number {
        return Dog.PLAYFUL_HOURLY_COSTS;
    }
    public likesActivity(activity: string): boolean {
        return Dog.LIKED_ACTIVITIES.some(likedActivity => likedActivity === activity);
    }
    public dislikesActivity(activity: string): boolean {
        return Dog.DISLIKED_ACTIVITIES.some(dislikedActivity => dislikedActivity === activity);
    }
    public doActivity(activity: string): string {
        if(activity === "eat") {
            super.eat();
            return "The dog enjoyed eating."
        } else if(activity === "nap") {
            super.sleep();
            return 'The dog took a good nap.'
        } else if(this.likesActivity(activity)) return `woooowwwww! The dog really enjoyed ${activity} activity.`;
        else if(this.dislikesActivity(activity)) return `The dog really hated at ${activity} activity.`
        else return `The dog felt indeferent about the ${activity} activity.`
    }
}

// Rabbit
class Rabbit extends Mammal implements PlayfulPet {
    private static readonly SPACIES = "Bunny";
    private static readonly LIFE_EXPECTANCY = 5000
    private static readonly BODY_TEMPERATURE = 37
    private static readonly PLAYFUL_HOURLY_COSTS = 120
    private static LIKED_ACTIVITIES = ["eat", "nap", "run", "jump"]
    private static DISLIKED_ACTIVITIES = ["stand"]
    constructor(heightM: number, weightKg: number, biologicalSex: string) {
        super(Rabbit.SPACIES, heightM, weightKg, Rabbit.LIFE_EXPECTANCY, biologicalSex, Rabbit.BODY_TEMPERATURE);
    }
    public toString(): string {
        return `${super.toString()} This is a rabbit.`
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
        return Rabbit.LIKED_ACTIVITIES.some(likedActivity => likedActivity === activity);
    }
    public dislikesActivity(activity: string): boolean {
        return Rabbit.DISLIKED_ACTIVITIES.some(dislikedActivity => dislikedActivity === activity);
    }
    public doActivity(activity: string): string {
        if(activity === "eat") {
            super.eat();
            return "The rabbit enjoyed eating.";
        } else if(activity === "nap") {
            super.sleep();
            return "The rabbit took a good nap.";
        }
        else if(this.likesActivity(activity)) return `boing-boing!! The rabbit really likes the ${activity} activity.`;
        else if(this.dislikesActivity(activity)) return `The rabbit really hate the ${activity} activity.`;
        else return `The rabbit felt indeferent about the ${activity} activity.`;
    }
}

abstract class PlayfulPetAssistant {
    protected static readonly DEFAULT_RENT_TIME: number = 1.0
    protected static readonly DEFAULT_TOUR = "all-rounder pack"
    protected currentPerson: Person | undefined
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
        if(!this.isValidTour(currentTour)) console.log(`Sorry, the tour guide does not accept the ${currentTour} tour.`);

        // Factory Methodを使ってPlayfulPetを生成
        const pets = this.createPlayfulPets(amount);
        let totalCost: number = 0;

        // 起動と遊び開始
        console.log("");
        console.log("Booting up... Playful Pet Assistance robot at your service");
        // ユーザーの情報を表示する
        console.log(`Printing information about the person to service... ${person}`);
        console.log("");

        pets.forEach(pet => {
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
    public abstract createPlayfulPets(amount: number): PlayfulPet[]
}

// 抽象クラスを作成した。その結果、Factory MethodであるcreatePlayfulPet()は具象クラスにて生成される
// これにより、オブジェクトの生成をサブクラスに権限を委ねている（抽象クラスはオブジェクトの生成ができない）
// 具象クラスで定義することのメインは、抽象クラスより権限を委ねられた「オブジェクトの生成」
class PlayfulCatAssistant extends PlayfulPetAssistant {
    public createPlayfulPets(amount: number): PlayfulPet[] {
        let catList: Cat[] = [];
        for(let i=0; i<amount; i++) {
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
        for(let i=0; i<amount; i++) {
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
        for(let i=0; i<amount; i++) {
            const heightM = RandomHelper.setRanDouble(0.2, 0.8);
            const weightKg = RandomHelper.setRanDouble(3, 7);
            const biologicalSex = RandomHelper.ranBoolean() ? "male" : "female";
            bunnyList.push(new Rabbit(heightM, weightKg, biologicalSex));
        }
        return bunnyList;
    }
}

class Invoice {
    private title: string
    private totalCost: number
    private petName: string
    private amount: number
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
    private assistantMap: Map<string, PlayfulPetAssistant>
    private invoiceList: Invoice[]
    constructor() {
        this.assistantMap = new Map();
        this.invoiceList = [];
    }
    public rentPet(petKey: string, person: Person, amount: number, tour: string): void {
        console.log("Thank you for your pet rental!");
        // assistantの取得
        const assistant = this.assistantMap.get(petKey);
        if(!assistant) {
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
        this.invoiceList.forEach(invoice => list.push(invoice.toString()));
        return list;
    }
    // PlayfulPetAssistantを追加するメソッド
    public addPlayfulPetAssistant(key: string, playfulPetAssistant: PlayfulPetAssistant): void {
        if(!this.assistantMap.get(key)) this.assistantMap.set(key, playfulPetAssistant);
    }
}

// FairyWorld, Person, PlayfulPetAssistantの生成
const fairyWorld = new FairyWorld();
const jessica = new Person("Jassica", "Roller", 30, 1.65, 55, "female");
const catAssistant = new PlayfulCatAssistant();
const dogAssistant = new PlayfulDogAssistant();
const bunnyAssistant = new PlayfulBunnyAssistant();
fairyWorld.addPlayfulPetAssistant("cat", catAssistant);
fairyWorld.addPlayfulPetAssistant("dog", dogAssistant);
fairyWorld.addPlayfulPetAssistant("bunny", bunnyAssistant);

fairyWorld.rentPet("cat", jessica, 2, "deluxe rounder pack");
console.log("##############");
fairyWorld.rentPet("dog", jessica, 4, "all-rounder pack");
console.log("##############");
fairyWorld.rentPet("bunny", jessica, 5, "all-rounder pack");