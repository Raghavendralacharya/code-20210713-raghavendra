const mongoose = require("mongoose");
const BMIDataSchema = new mongoose.Schema(
{
    BMICategory: {
        type: String
    },
    BMIRangeFrom: {
        type: Number
    },
    BMIRangeTo: {
        type: Number
    },
    HealthRisk: { 
        type: String
    }
});

const BMIData = mongoose.model("BMIData", BMIDataSchema);

module.exports = BMIData;