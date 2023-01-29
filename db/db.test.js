const {connect, savePost, disconnect} = require("./db");
const Motorcycle = require("../api/model/motorcycle");

//describe(), test(), expect()

jest.mock("./db")

/* Cannot get the beforeAll/afterAll to work correctly and stumped after searching on
the internet for solutions. */

describe('db function test', () => {
    
    beforeAll(() => {
        return connect();
      });
      
    test('As a user, I want to post a post to MOTORCYCLES database', async () => {
        const newMotorcycle = new Motorcycle ({
            year: "2007",
            make: "Triumph",
            model: "Bonneville",
        });

        const motorcycle = await savePost(newMotorcycle);
        expect(motorcycle.year).toEqual("2007");
        expect(motorcycle.make).toEqual("Triumph");
        expect(motorcycle.model).toEqual("Bonneville");
    });

    afterAll(() => {
        return disconnect();
    });
});