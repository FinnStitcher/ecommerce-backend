const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
        {
            model: Product,
            attributes: ['product_name', 'price', 'stock']
        }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET one
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
        id: req.params.id
    },
    include: [
        {
            model: Product,
            attributes: ['product_name', 'price', 'stock']
        }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({message: 'No category with that ID was found'});
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// add
router.post('/', (req, res) => {
    Category.create(req.body)
    .then(dbCategoryData => {
        res.status(200).json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update
router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({message: 'No category with that ID was found'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// delete
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({message: 'No category with that ID was found'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
