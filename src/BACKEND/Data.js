const Data = [
    {
        id: 1,
        Title: "Poland",
        Description: "Polish",
        Price: 100,
        Image: "Warsaw",
    },
    {
        id: 2,
        Title: "Poland",
        Description: "Polish",
        Price: 100,
        Image: "Warsaw",
    },
    {
        id: 3,
        Title: "Poland",
        Description: "Polish",
        Price: 100,
        Image: "Warsaw",
    },
    {
        id: 4,
        Title: "Poland",
        Description: "Polish",
        Price: 100,
        Image: "Warsaw",
    },
    {
        id: 5,
        Title: "Poland",
        Description: "Polish",
        Image: "Warsaw",
    },
    {
        id: 6,
        Title: "Poland",
        Description: "Polish",
        Image: "Warsaw",
    },
];



const generateRandomProduct = (id) => {
    const titles = ["Product A", "Product B", "Product C", "Product D", "Product E"];
    const descriptions = ["Description for Product A", "Description for Product B", "Description for Product C", "Description for Product D", "Description for Product E"];

    const randomIndex = Math.floor(Math.random() * titles.length);
    const title = titles[randomIndex];
    const description = descriptions[randomIndex];
    const price = (Math.random() * 100).toFixed(2); // Random price between 0 and 100
    const image = `../UI/images/${id}.jpg`; // Assuming image URLs follow a pattern

    return {
        id: id,
        title: title,
        description: description,
        price: price,
        image: image,
    };
};

// Generate an array of random products


const randomProducts = [];

for (let i = 1; i <= 10; i++) {
    randomProducts.push(generateRandomProduct(i));
}

export default randomProducts;

//console.log(randomProducts)