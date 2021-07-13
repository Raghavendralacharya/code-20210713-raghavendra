const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
{
    Gender: {
        type: String
    },
    HeightCm: {
        type: Number
    },
    WeightKg: {
        type: Number
    },
    BMI: { 
        type: Number
    },
    BMICategory: {
        type: String
    },
    HealthRisk: {
        type: String
    }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;