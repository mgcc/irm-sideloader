
const mongoose = require('mongoose');
const Pest = mongoose.model('Pest');
const Moa = mongoose.model('MoA');
const csv = require("csvtojson")

exports.pest = () => {
  const pests_FP = "./input/pests.csv"

  csv()
    .fromFile(pests_FP)
    .then((pests) => {
      console.log(pests)

      pests.forEach((pest) => {
        const newPest = new Pest(pest);

        newPest.save();
      })

    })
}

exports.moa = () => {
  const moa_FP = "./input/moa.csv";

  csv()
    .fromFile(moa_FP)
    .then((moa) => {
      console.log(moa);

      moa.forEach((moa) => {
        const newMoa = new Moa(moa);

        newMoa.save();
      })
    });
}

exports.ai = () => {
  const ai_FP = "./input/activeIngredients.csv";

  csv()
    .fromFile(ai_FP)
    .then((ai) => {
      console.log(ai);

      ai.forEach(() => {

      })

    })
}