const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let products = require('./data/products.json');
const originalProducts = JSON.parse(JSON.stringify(products));

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/search', (req, res) => {
  const searchTerm = req.query.name?.toLowerCase();
  if (!searchTerm) {
    return res.status(400).json({ message: "Please provide a valid search term" });
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  res.json(filteredProducts);
});

app.get('/products/sort', (req, res) => {
  const order = req.query.order;
  if (!['asc', 'desc'].includes(order)) {
    return res.status(400).json({ message: "Invalid sort order" });
  }

  const sortedProducts = [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });

  res.json(sortedProducts);
});


app.put('/products/purchase', (req, res) => {
  const cartItems = req.body;

  cartItems.forEach(cartItem => {
    const product = products.find(prod => prod.id === cartItem.id);
    if (product && product.stock >= cartItem.quantity) {
      product.stock -= cartItem.quantity;
    }
  });

  fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(products, null, 2), 'utf-8');

  res.status(200).json({ message: "Purchase successful" });
});

app.put('/products/restore', (req, res) => {
  const cartItems = req.body;
  
  cartItems.forEach(cartItem => {
    const product = products.find(prod => prod.id === cartItem.id);
    if (product) {
      const originalProduct = originalProducts.find(prod => prod.id === cartItem.id);
      product.stock += cartItem.quantity;
      if (product.stock > originalProduct.stock) {
        product.stock = originalProduct.stock;
      }
    }
  });

  fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(products, null, 2), 'utf-8');

  res.status(200).json({ message: "Selected products restored successfully", products });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
