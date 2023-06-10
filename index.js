let candies = [];

async  function addCandy() {
    // Get input values
    const name = document.getElementById("candy-name").value;
    const description = document.getElementById("candy-description").value;
    const price = document.getElementById("candy-price").value;
    const quantity = document.getElementById("candy-quantity").value;

    // Create candy object
    const candy = {
        name: name,
        description: description,   
        price: price,
        quantity: quantity
    };


    try {
        // Send POST request to CRUD CRUD API

        const response = await axios.post('https://crudcrud.com/api/978de96e7e9c4ff7b485a71d48a33801/candies', candy);

        // Add candy to the list
        candies.push(response.data);

        // Clear form inputs
        document.getElementById("add-candy-form").reset();

        // Update stock list display
        updateStockList();
        
    } catch (error) {
        console.error('Error', error);
    }
}




function updateStockList() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "";

    for (let i = 0; i < candies.length; i++) {
        const candy = candies[i];

        const candyItem = document.createElement("div");
        candyItem.innerHTML = `${candy.name} - ${candy.description} - ${candy.price} - ${candy.quantity}`;

        // Create Buy buttons for each candy item
        const buy1Button = document.createElement("button");
        buy1Button.textContent = "Buy1";
        buy1Button.addEventListener("click", function() {
            buyCandy(i, 1);
        });
        candyItem.appendChild(buy1Button);


        // Button 2
        const buy2Button = document.createElement("button");
        buy2Button.textContent = "Buy2";
        buy2Button.addEventListener("click", function() {
            buyCandy(i, 2);
        });
        candyItem.appendChild(buy2Button);


        // Button 3
        const buy3Button = document.createElement("button");
        buy3Button.textContent = "Buy3";
        buy3Button.addEventListener("click", function() {
            buyCandy(i, 3);
        });
        candyItem.appendChild(buy3Button);

        stockList.appendChild(candyItem);
    }
}

function buyCandy(index, quantity) {
    const candy = candies[index];
    const currentQuantity = parseInt(candy.quantity);

    if (currentQuantity < quantity) {
        alert("Not enough stock available.");
        return;
    } 

    candy.quantity = currentQuantity - quantity;

    // Update stock list display
    updateStockList();
}


// To retrieve candies from the API on page load

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/978de96e7e9c4ff7b485a71d48a33801/candies');
        candies = response.data;

        // Update stock list display
        updateStockList();
    } catch (error) {
        console.error('Error', error);
    }
});

