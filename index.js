import express from 'express';
const app = express();
let PORT = process.env.Deploy || 330;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
});
app.get("/about", (req, res) => {
    res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products</h3>");
});
app.get("/contact", (req, res) => {
    res.send({
        "email": "care@glowderma.com",
        "instagram": "http://instagram.com/glowderma",
        "consultation": "http://glowderma.com/book-appointment"
    });
});
app.get("/services", (req, res) => {
    res.send("Services provided by Skinfinity.");
});
let orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
    { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
    { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
];
app.get("/orders/:orderID", (req, res) => {
    const orderID = parseInt(req.params.orderID);
    const order = orders.find(order => order.id === orderID);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).send("Order Not Found");
    }
});


// const limiter = rateLimit({
//     windowMs: 1000 * 60 * 5, // 5 minutes
//     max: 5, // Limit each IP to 5 requests per windowMs
//     message: "Sorry, you have exhausted your plan.", // Custom error message
// });

// // Apply the rate limiter to all requests
// app.use(limiter);


let products = [
    { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
    { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
    { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
    { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
];
app.get("/products", (req, res) => {
    const { name, maxPrice } = req.query;
    let filteredProducts = [products];

    if (name) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseInt(maxPrice, 10)
        );
    }

    res.status(200).json(filteredProducts);
});
app.get("/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid);
    let product;
    product = items.find(item => item.id === pid);
    if (!product) {
        product = products.find(p => p.id === pid);
        if (product) {
            res.status(200).json({
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "availableQty": product.availableQty
            });
        } else {
            res.status(404).send("Product Not Found");
        }
    } else {
        res.status(200).json({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description
        });
    }
});

let shoppingCart = [];
app.get("/cart", (req, res) => {
    res.status(200).json(shoppingCart);
});
app.post("/cart", (req, res) => {
    const { id, name, price, qty } = req.body;
    if (id && name && price && qty) {
        shoppingCart.push({ id, name, price, qty });
        res.status(201).json({ message: "Successfully added item to cart", data: { id, name, price, qty } });
    } else {
        res.status(400).json({ error: "Please ensure all fields are provided" });
    }
});
app.get("/policy", (req, res) => {
    res.send("Policy Information");
});

let items = [
    {
        id: 1,
        name: "Face Wash",
        price: "200",
        description: "Daily face wash for glowing skin"
    },
    {
        id: 2,
        name: "Face Cream",
        price: "300",
        description: "Moisturizing face cream for soft skin"
    },
    {
        id: 3,
        name: "Body Lotion",
        price: "250",
        description: "Hydrating body lotion for soft skin"
    },
    {
        id: 4,
        name: "Sunscreen",
        price: "350",
        description: "Protects skin from UV rays"
    },
    {
        id: 5,
        name: "Face Pack",
        price: "400",
        description: "Face pack for glowing skin"
    },
];
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});