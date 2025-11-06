const Review = require("../reviews/review.model");
const { sendError, sendSuccess } = require("../utils/responseHandler");
const Product = require("./product.model");

const createNewProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
    });

    const saveProduct = product.save();

    const reviews = await Review.find({ userId: saveProduct._id });

    if (reviews > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      saveProduct.rating = averageRating;
      await saveProduct.save();
    }
    return sendSuccess(res, 200, "Product created successfully", {
      saveProduct,
    });
  } catch (error) {
    return sendError(res, 500, "New product created failed", error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (color && color !== "all") {
      filter.color = color;
    }

    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "username email role");

    return sendSuccess(res, 200, "Products fetched successfully", {
      products,
      totalProducts,
      totalPages,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to get all products", error);
  }
};

//get single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate(
      "author",
      "username email"
    );
    if (!product) {
      return sendError(res, 4500, "Product Not Found", error);
    }

    return sendSuccess(res, 200, "Product fetched successfully", {
      product,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to get this products", error);
  }
};

const updateSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, { ...req.body });

    if (!product) {
      return sendError(res, 4500, "Product Not Found", error);
    }

    return sendSuccess(res, 200, "Product Updated successfully", {
      product,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to update this products", error);
  }
};



const deleteSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return sendError(res, 4500, "Product Not Found", error);
    }

    const reviewDelete = await Review.deleteMany({productId: id})

    return sendSuccess(res, 200, "Product Updated successfully", {
      deleteProduct,
      reviewDelete
    });


  } catch (error) {
    return sendError(res, 500, "Failed to delete this products", error);
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct
};
