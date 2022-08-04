const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all
router.get("/", (req, res) => {
	Tag.findAll({
		include: [
			{
				model: Product,
				through: ProductTag,
				as: "tagged_products",
				attributes: ["product_name"],
			},
		],
	})
		.then(dbTagData => res.json(dbTagData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET one
router.get("/:id", (req, res) => {
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
				through: ProductTag,
				as: "tagged_products",
				attributes: ["product_name"],
			},
		],
	})
		.then(dbTagData => {
			if (!dbTagData) {
				res.status(404).json({
					message: "No tag with that ID was found",
				});
				return;
			}
			res.json(dbTagData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST
router.post("/", (req, res) => {
	Tag.create(req.body)
		.then(dbTagData => {
			res.json(dbTagData);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json(err);
		});
});

// PUT
router.put("/:id", (req, res) => {
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then(dbTagData => {
			if (!dbTagData) {
				res.status(404).json({
					message: "No tag with that ID was found",
				});
				return;
			}
			res.json(dbTagData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE
router.delete("/:id", (req, res) => {
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(dbTagData => {
			if (!dbTagData) {
				res.status(404).json({
					message: "No tag with that ID was found",
				});
				return;
			}
			res.json(dbTagData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
