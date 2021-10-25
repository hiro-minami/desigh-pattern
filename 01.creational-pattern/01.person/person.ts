class Person {
    private firstName: string;
    private lastName: string;
    private age: number;
    private heightM: number;
    private weightKg: number;
    private biologicalSex: string;
    constructor(firstName: string, lastName: string, age: number, heightM: number, weightKg: number, biologicalSex: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.heightM = heightM;
        this.weightKg = weightKg;
        this.biologicalSex = biologicalSex;
    }
    public getHeightM(): number {
        return this.heightM;
    }
    public getWeightKg(): number {
        return this.weightKg;
    }
    public getName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    public toString(): string {
        return this.getName();
    }
}

class Example {
    public static calculateBMI(): number {
        // メソッドの中で依存関係のクラスを生成する
        // こうしてしまうと外からは依存関係は見えないし、引数をとっていないため、Personを修正するともろに影響を受ける→低凝集
        const person = new Person("Jessica", "Roller", 30, 1.65, 95, "female");
        return person.getWeightKg() / Math.pow(person.getHeightM(), 2);
    }
}

console.log(Example.calculateBMI());
