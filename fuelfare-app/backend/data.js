export const dummyUsers = [
    {
        id: "",
        email: "dummyUser1@testing.com",
        // decrypted password: password1
        encryptedPassword: "#",
        role: "client",
        profile: null
    },
    {
        id: "",
        email: "dummyUser2@testing.com",
        // decrypted password: password2
        encryptedPassword: "#",
        role: "client",
        profile: {
            id: "",
            fName: "user2",
            company: "company2",
            addy1: "address2",
            addy2: "",
            city: "city2",
            state: "state2",
            zip: "22222",
            quoteHistory: [],
            paymentHistory: [],
        },
    },
    {
        id: "",
        email: "dummyUser3@testing.com",
        // decrypted password: password3
        encryptedPassword: "#",
        role: "client",
        profile: {
            id: "",
            fName: "user3",
            company: "comany3",
            addy1: "address3",
            addy2: "",
            city: "",
            state: "",
            zip: "",
            quoteHistory: [
                {
                    id: "",
                    numGallons: "",
                    fuelType: "",
                    pricePerGallon: "",
                    dateDelivery: "",
                },
                {
                    id: "",
                    numGallons: "",
                    fuelType: "",
                    pricePerGallon: "",
                    dateDelivery: "",
                }
            ],
            paymentHistory: [
                {
                    id: "",
                    quoteID: "",
                    quoteCost: ""
                },
                {
                    id: "",
                    quoteID: "",
                    quoteCost: ""
                }
            ],
        },
    },
    {
        id: "",
        email: "dummyUser4@testing.com",
        // decrypted password: password4
        encryptedPassword: "#",
        role: "client",
        profile: {
            id: "",
            fName: "",
            company: "",
            addy1: "",
            addy2: "",
            city: "",
            state: "",
            zip: "",
            quoteHistory: [],
            paymentHistory: [],
        },
    },
    {
        id: "",
        email: "dummyUser5@testing.com",
        // decrypted password: password5
        encryptedPassword: "#",
        role: "admin",
        profile: {
            id: "",
            fName: "",
            company: "",
            addy1: "",
            addy2: "",
            city: "",
            state: "",
            zip: "",
            quoteHistory: [],
            paymentHistory: [],
        },
    },
];
  
  module.exports = data;