const router = require("express").Router();
const Rating = require("../models/rating.model");

//*** add rating ****//
router.post("/add", async (req, res) => {
  try {
    let { owner_id, worker_id, review, rating,date } = req.body;
    const newRating = new Rating({
      owner_id,
      worker_id,
      review,
      rating,
      date,
    });

    const savedRating = await newRating.save();
    res.json(savedRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//***get seller reviews****//
router.get("/review/:id", async (req, res) => {
  const id = req.params.id;
  await Rating.find({ worker_id: id })
    .populate("owner_id")
    .populate("worker_id")
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//***get buyer reviews****/
router.get("/buyerReview/:id", async (req, res) => {
  const id = req.params.id;
  await Rating.find({ buyer_id: id })
    .populate("owner_id")
    .populate("worker_id")
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//** get overall rating**//
router.get("/get-overall-rate/:id", async (req, res) => {
  try {
    let fullSum = 0;
    let count = 0;
    Rating.find({ worker_id: req.params.id })
      .exec()
      .then((item) => {
        item.forEach(function (items, index, arr) {
          //let itemSum = items.cartPrice * items.quantity;
          count = count + 1;
          fullSum = fullSum + items.rating;
        });
        res.status(200).json({ total: fullSum, count: count });
      })
      .catch((err) => {
        console.log("fail");
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
