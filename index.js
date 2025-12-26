const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const { initializeDatabase } = require("./src/db/db.connect");

const Product = require("./src/models/products.model");
const Category = require("./src/models/category.model");

const { productsData } = require("./src/datas/productsData");
const { categoriesData } = require("./src/datas/categoriesData");

/* ---------------- SERVER START ---------------- */
async function startServer() {
  try {
    await initializeDatabase();

    // ✅ ONLY uncomment ONE TIME
    await seedCategories();
    await seedProducts();

    app.get("/", (req, res) => {
      res.send("🚀 E-commerce Backend Running...");
    });

    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();

/* ---------------- SEED DATA ---------------- */

async function seedProducts() {
  try {
    for (const product of productsData) {
      const newProduct = new Product(product);
      await newProduct.save();
      console.log(`Saved product: ${product.name}`);
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

async function seedCategories() {
  try {
    for (const category of categoriesData) {
      const newCategory = new Category(category);
      await newCategory.save();
      console.log(`Saved category: ${category.title}`);
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
}

/* ---------------- PRODUCT ROUTES ---------------- */

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.json({
        data: {
          products,
        },
      });
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET PRODUCT BY ID
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.productId),
    });

    if (product) {
      res.json({
        data: {
          product,
        },
      });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});


/* ---------------- CATEGORY ROUTES ---------------- */

// GET ALL CATEGORIES
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length > 0) {
      res.json({
        data: {
          categories,
        },
      });
    } else {
      res.status(404).json({ error: "No categories found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET CATEGORY BY ID
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const category = await Category.findOne({
      id: Number(req.params.categoryId),
    });

    if (category) {
      res.json({
        data: {
          category,
        },
      });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});
