import * as CSVUtils from "../CSVUtils";

type Pet = {
  name: string;
  type: string;
};

type Home = {
  number: number;
  street: string;
};

type Person = {
  age: number;
  name: string;
  pets: Pet[];
  home?: Home;
};

const testData: Person[] = [
  {
    name: "Person1",
    age: 20,
    pets: [
      { name: "Beans", type: "Cat" },
      { name: "Spot", type: "Dog" },
    ],
  },
  {
    name: "Person2",
    age: 25,
    pets: [{ name: "Splash", type: "Fish" }],
  },
];

describe("CSVUtils", () => {
  it("generateCSV should include all fields, with nested objects/arrays, if no options", async () => {
    const result = await CSVUtils.generateCSV<Person>({ data: testData });
    expect(result).toEqual(
      `"name","age","pets"\n` +
        `"Person1",20,"[{""name"":""Beans"",""type"":""Cat""},{""name"":""Spot"",""type"":""Dog""}]"\n` +
        `"Person2",25,"[{""name"":""Splash"",""type"":""Fish""}]"`,
    );
  });

  it("generateCSV should only include the fields specified", async () => {
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      fields: ["age", "name"],
    });
    expect(result).toEqual(`"age","name"\n20,"Person1"\n25,"Person2"`);
  });

  it("generateCSV should transform fields properly if specified", async () => {
    const transformFunction = (person: Person) => ({
      ...person,
      age: person.age + 1,
      petNames: person.pets.map((pet) => pet.name),
      numPets: person.pets.length,
    });
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      transformFunction,
    });
    expect(result).toEqual(
      `"name","age","pets","petNames","numPets"\n` +
        `"Person1",21,"[{""name"":""Beans"",""type"":""Cat""},{""name"":""Spot"",""type"":""Dog""}]","[""Beans"",""Spot""]",2\n` +
        `"Person2",26,"[{""name"":""Splash"",""type"":""Fish""}]","[""Splash""]",1`,
    );
  });

  it("generateCSV should flatten objects properly if specified", async () => {
    const testDataWithHomes = [
      { ...testData[0], home: { number: 22, street: "Cool Road" } },
      { ...testData[1], home: { number: 24, street: "Awesome Road" } },
    ];
    const result = await CSVUtils.generateCSV<Person>({
      data: testDataWithHomes,
      flattenObjects: true,
    });
    expect(result).toEqual(
      `"name","age","pets","home.number","home.street"\n` +
        `"Person1",20,"[{""name"":""Beans"",""type"":""Cat""},{""name"":""Spot"",""type"":""Dog""}]",22,"Cool Road"\n` +
        `"Person2",25,"[{""name"":""Splash"",""type"":""Fish""}]",24,"Awesome Road"`,
    );
  });

  it("generateCSV should flatten arrays properly if specified", async () => {
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      flattenArrays: true,
    });
    expect(result).toEqual(
      `"name","age","pets.0","pets.1"\n` +
        `"Person1",20,"{""name"":""Beans"",""type"":""Cat""}","{""name"":""Spot"",""type"":""Dog""}"\n` +
        `"Person2",25,"{""name"":""Splash"",""type"":""Fish""}",`,
    );
  });

  it("generateCSV should flatten objects and arrays properly if specified", async () => {
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      flattenArrays: true,
      flattenObjects: true,
    });
    expect(result).toEqual(
      `"name","age","pets.0.name","pets.0.type","pets.1.name","pets.1.type"\n` +
        `"Person1",20,"Beans","Cat","Spot","Dog"\n` +
        `"Person2",25,"Splash","Fish",,`,
    );
  });

  it("generateCSV should unwind fields properly if specified", async () => {
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      pathsToUnwind: ["pets"],
    });
    expect(result).toEqual(
      `"name","age","pets"\n` +
        `"Person1",20,"{""name"":""Beans"",""type"":""Cat""}"\n` +
        `"Person1",20,"{""name"":""Spot"",""type"":""Dog""}"\n` +
        `"Person2",25,"{""name"":""Splash"",""type"":""Fish""}"`,
    );
  });

  it("generateCSV should override/add options if opts is specified", async () => {
    const result = await CSVUtils.generateCSV<Person>({
      data: testData,
      opts: { header: false },
    });
    expect(result).toEqual(
      `"Person1",20,"[{""name"":""Beans"",""type"":""Cat""},{""name"":""Spot"",""type"":""Dog""}]"\n` +
        `"Person2",25,"[{""name"":""Splash"",""type"":""Fish""}]"`,
    );
  });
});
