
const mongoose = require('mongoose');
const Pest = mongoose.model('Pest');
const MoA = mongoose.model('MoA');
const ActiveIngredient = mongoose.model('ActiveIngredient')
const Insecticide = mongoose.model('Insecticide')
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

  Pest.find((err, existingPests) => {
    MoA.find((err, existingMoas) => {
      csv()
      .fromFile(ai_FP)
      .then((ai) => {

        ai.forEach((ai, aiIndex) => {

          // Get MoA IDs
          const moas = ai.moa.split('+')
          const moAIDs = []
          moas.forEach((moa) => {
            const filteredMoa = existingMoas.filter(i => i.name === moa.trim())

            if (filteredMoa.length === 1) moAIDs.push(new mongoose.Types.ObjectId(filteredMoa[0]._id))
          })
          ai.moa = moAIDs

          // Get Pest IDs
          const pests = ai.targetPests.split(',')
          const pestIDs = []
          pests.forEach((pest) => {
            const filteredPests = existingPests.filter(i => i.name === pest.trim())

            if (filteredPests.length === 1) pestIDs.push(new mongoose.Types.ObjectId(filteredPests[0]._id))
          })
          ai.targetPests = pestIDs

          // set no PHI to null

          if (ai.phi === '-') {
            delete ai.phi
          } else {
            ai.phi = parseInt(ai.phi)
          }

          const newAI = new ActiveIngredient(ai)
          newAI.save((err, record) => {
            if (!err) {
              console.log('saved ' + aiIndex)
              console.log(record)
            }
            else console.log(err)
          })
        })
      })


    })
  })
 }

exports.insecticide = () => {
  const i_FP = "./input/insecticides.csv"

  ActiveIngredient.find((err, existingAI) => {

    csv()
    .fromFile(i_FP)
    .then((i) => {
      
      i.forEach((i, iIndex) => {
        const filteredAI = existingAI.filter(a => a.name.trim() === i.activeIngredient.trim())

        if (filteredAI.length === 1) {
          i.activeIngredient = new mongoose.Types.ObjectId(filteredAI[0]._id)
        }

        if (i.min && i.min !== '') {
          i.min = parseFloat(i.min)
        } else {
          delete i.min
        }

        if (i.max && i.max !== '') {
          i.max = parseFloat(i.max)
        } else {
          delete i.max
        }

        console.log(i)

        const newInsecticide = new Insecticide(i)
        newInsecticide.save((err, record) => {
          if (!err) {
            console.log(`Saved record ${iIndex}`)
          }
        })


      })
    })
  })


}

