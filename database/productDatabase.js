const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "products.json");

async function readProducts() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeProducts(products) {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

async function getAll() {
  return readProducts();
}

async function getById(id) {
  const products = await readProducts();
  return products.find((product) => String(product.id) === String(id)) || null;
}

async function create(productData) {
  const products = await readProducts();
  const nextId = products.reduce((max, product) => Math.max(max, Number(product.id) || 0), 0) + 1;
  const product = { id: nextId, ...productData };
  products.push(product);
  await writeProducts(products);
  return product;
}

async function replace(id, productData) {
  const products = await readProducts();
  const index = products.findIndex((product) => String(product.id) === String(id));
  if (index === -1) return null;
  products[index] = { id: products[index].id, ...productData };
  await writeProducts(products);
  return products[index];
}

async function update(id, updates) {
  const products = await readProducts();
  const index = products.findIndex((product) => String(product.id) === String(id));
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  await writeProducts(products);
  return products[index];
}

async function remove(id) {
  const products = await readProducts();
  const index = products.findIndex((product) => String(product.id) === String(id));
  if (index === -1) return null;
  const [deleted] = products.splice(index, 1);
  await writeProducts(products);
  return deleted;
}

module.exports = { getAll, getById, create, replace, update, remove };
