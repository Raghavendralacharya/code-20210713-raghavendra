const db = require("../models");
const BMIData = db.BMIData;
const Person = db.person;
let common =require("../common")
let validation = common.validation;
let Constant = common.Constant;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.calcBMI = async (req, res, next) => {
    try {
        let output = [];
        let input = req.body;
        let overWeightCount = 0
        let BMIDataTBl = await BMIData.find();
        input.forEach( element => {
            let elemCp = JSON.parse(JSON.stringify(element))
            // elemCp["bmikgm"] = (element.WeightKg / element.HeightCm )* 100;
            elemCp[Constant.BMI] = (element.WeightKg / (element.HeightCm * element.HeightCm))* 10000;
            let bmiRes = getBMIcategoryAndHeathRisk(BMIDataTBl, elemCp);
            elemCp[Constant.BMICategory] = bmiRes[Constant.BMICategory];
            if(elemCp[Constant.BMICategory] == Constant.OVERWEIGHT){
                overWeightCount = overWeightCount + 1
            }
            elemCp[Constant.HealthRisk] = bmiRes[Constant.HealthRisk]
            output.push(elemCp);
        });

        let personResp = await addPerson(output);

        res.status(200).json({
                status: "success",
                data: personResp,
                overWeightCount : overWeightCount
            });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message:
                error.message || "error occurred while adding person details.",
        });
    }
}

function getBMIcategoryAndHeathRisk(BMIDataTBl,input){
    let res = BMIDataTBl.find(elem=> elem.BMIRangeTo> input.bmi  &&  elem.BMIRangeFrom <input.bmi)
    return res;
}


async function addPerson(person) {
    //add person to the person list
    try {
        const newPerson = await Person.create(person);
        return newPerson
    } catch (error) {
        console.log("person creation failed",error)
        reject(error)
    }
}
