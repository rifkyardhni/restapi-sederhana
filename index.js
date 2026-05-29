const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let products = [
  { id: 1, name: 'Apple iPhone 15', price: 15000000, stock: 10, category: 'Smartphone' },
  { id: 2, name: 'Samsung Galaxy S23', price: 12000000, stock: 15, category: 'Smartphone' },
  { id: 3, name: 'MacBook Air M2', price: 18000000, stock: 5, category: 'Laptop' }
];


let nextId = 4;

app.get('/api/products', (req, res) => {
  res.status(200).json({
    message: 'Berhasil mengambil semua produk',
    data: products
  });
});


app.post('/api/products', (req, res) => {
  const { name, price, stock, category } = req.body;

  if (!name || !price || !stock || !category) {
    return res.status(400).json({
      message: 'Gagal menambahkan produk. Mohon lengkapi semua data (name, price, stock, category).'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseInt(price),
    stock: parseInt(stock),
    category
  };

  products.push(newProduct);

  res.status(201).json({
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  });
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { price, stock } = req.body;

  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: `Produk dengan ID ${id} tidak ditemukan`
    });
  }

  if (price !== undefined) products[productIndex].price = parseInt(price);
  if (stock !== undefined) products[productIndex].stock = parseInt(stock);

  res.status(200).json({
    message: 'Produk berhasil diupdate',
    data: products[productIndex]
  });
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: `Produk dengan ID ${id} tidak ditemukan`
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.status(200).json({
    message: 'Produk berhasil dihapus',
    data: deletedProduct[0]
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});