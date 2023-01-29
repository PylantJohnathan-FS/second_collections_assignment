const {connect, savePost, disconnect} = require("./db");
const Motorcycle = require("../api/model/motorcycle");

//describe(), test(), expect()

// jest.mock("./db")

beforeAll(async () => {
    return await connect();
  });

describe("MOTORCYCLES Post Test Suite",() => {
    test("As a user, I want to post a post to MOTORCYCLES database", async ()=>{
        const motorcycle = new Motorcycle ({
            // _id: String,
            year: "2007",
            make: "Triumph",
            model: "Bonneville",
        });

        const newMotorcycle = await savePost(motorcycle);
        // expect(newMotorcycle.id).toEqual(String);
        expect(newMotorcycle.year).toEqual("2007");
        expect(newMotorcycle.make).toEqual("Triumph");
        expect(newMotorcycle.model).toEqual("Bonneville");
    });
});

afterAll(async () => {
    return await disconnect();
});