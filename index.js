// Get the data from the table

const form = document.getElementById('add-candy-form');
const display = document.getElementById('display');


//add eventListner
form.addEventListener('submit', (event) =>{
      event.preventDefault();

      //get the value entrered by the user form 
      const candyName = document.getElementById('Candy-name').value;
      const description = document.getElementById('Description').value;
      const price = document.getElementById('Price').value;
      const quantity = document.getElementById('Quantity').value;


      //create new candy object

      const candyItem = {
            name: candyName,
            description: description,
            price: price,
            quantity: quantity,
      };

      const candy = {
            name,
            description,
            price,
            quantity,
      }

      //Add the candy item to display
      display.innerHTML += `<p> Name: ${candyItem.name}, Description: ${candyItem.description}, Price: ${candyItem.price}, Quantity: ${candyItem.quantity}</p>`;

      //also reset the form input
      form.reset();

      //send POST request to creat the new candy resource on the CRUD

       fetch(`https://crudcrud.com/api/a54a9e187be74604a8a3f971c2c1938f/candies`, {
            method : 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(candy)
      })
      .then(response => response.json())
      .then(data => {
            console.log('Success:', data);
            refreshCandiesDisplay();
      })
      .catch((error) => {
            console.log('Error:', error);
      });
});


 function refreshCandiesDisplay(){
      const candyList = document.getElementById('candy-list');
      candyList.innerHTML = '';

 //make a GET request to the API to retrieve the candies

 fetch('https://crudcrud.com/api/a54a9e187be74604a8a3f971c2c1938f/candies')
 .then(response => response.json())
 .then(candies => {
      // Add each candy to the candy list
      candies.forEach((candy, index) => {
            const candyItem = document.createElement('li');
            candyItem.textContent = `${index+1}. ${candy.name} - ${candy.description}, ${candy.price}, ${candy.quantity} left`
            candyList.appendChild(candyItem);
      });
 })
 .catch((error) => {
      console.log('Error:', error);
 });
}
document.addEventListener('DOMContentLoaded', refreshCandiesDisplay);


//Update a candy using the API

function updateCandy(id, updateCandy){
      //make a PUT request to the API to update the candy

      fetch(`https://crudcrud.com/api/a54a9e187be74604a8a3f971c2c1938f/candies/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updateCandy)   
      })
      .then(response => response.json())
      .then(data => {
            console.log('Success', data);
            refreshCandiesDisplay();
      })
      .catch((error) => {
            console.log('Error:', error);
      })
}


//Delete a candy using the API

function deleteCandy(id){
      fetch(`https://crudcrud.com/api/a54a9e187be74604a8a3f971c2c1938f/candies/${id}`, {
            method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
            console.log('Success:', data);
            refreshCandiesDisplay();
      })
      .catch((error) => {
            console.log('Error', error);
      })
}