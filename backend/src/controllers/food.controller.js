const Food = require('../models/food.model')
const Category = require('../models/category.model')

const createFood = async (req, res) => {
    if (req.body) {
        const food = new Food(req.body);
        const existingCode = await Food.find({ code: req.body.code })
        console.log(existingCode)
        if (existingCode.length === 0) {
            await food.save()
                .then(data => {
                    if (data.categories.length > 0) {
                        data.categories.map(async (category) => {
                            await Category.findByIdAndUpdate(category, { $push: { foods: data._id } }, { new: true, useFindAndModify: false })
                        })
                    }
                    res.status(200).send(data);
                })
                .catch(error => {
                    res.status(500).send({ error: error.message });
                });
        }
        res.status(400).send({ error: "Code exist" });
    }
}

const getAllFoods = async (req, res) => {
    await Food.find({}).populate('categories', 'name description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const calculateBill = async (req, res) => {
    const FID = req.body.fid;
    const quantity = req.body.quantity;

    const food = await Food.findById(FID);

    const total = food.amount * Number(quantity);

    res.status(200).json({
        success: true,
        price: total
    })

}

module.exports = {
    createFood,
    getAllFoods,
    calculateBill
}