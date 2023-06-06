// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("cakeform");
const cakelist = document.getElementById("cakelist");


const localStorageKey = 'DECO2017.SDAN5477.Cakes'
let entryList = [];
const saved = localStorage.getItem(localStorageKey);
const parsedSaved = JSON.parse(saved);
console.log(entryList);
if(parsedSaved) {
    entryList = parsedSaved;
    
    for(const cake in parsedSaved) {
        displayCake(parsedSaved[cake]);   
    }
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log(form.elements.cakeType.value)

    save(
        form.elements.cakeName.value,
        form.elements.cakeType.value,
        form.elements.cakeFlavour.value,  
        form.elements.cakeRate.value,
        form.elements.cakeBakery.value,
        form.elements.cakeComment.value,
    );

    addCake(
        form.elements.cakeName.value,
        form.elements.cakeType.value,
        form.elements.cakeFlavour.value,  
        form.elements.cakeRate.value,
        form.elements.cakeBakery.value,
        form.elements.cakeComment.value,
    );

    console.log(entryList)
})

function displayCake(cake) {
    let item = document.createElement("li");
    item.setAttribute("data-id", cake.id);
    item.innerHTML = `<p><strong>${cake.name}</strong><br>${cake.type}<br>${cake.flavour}<br>${cake.rate}<br>${cake.date}</p>`;

    entrylist.appendChild(item);

    item.addEventListener("click", (evt) => {
       // alert(`you've clicked ${cake.name}`);
        const overlay = document.createElement("div");
       
        // overlay.addEventListener("click", (evt) => {
        //     // evt.preventDefault();
        //     // evt.target.remove(evt.target);
        //     overlay.parentNode.removeChild(overlay);
        // });
        overlay.classList.add("overlay");

        const modal = document.createElement("model");
        modal.classList.add('modal');
        modal.innerHTML = `<h2>${cake.name}</h2><br><p><em>ID: ${cake.id}<br>Date: ${cake.date}</em> <br> <br>Type: ${cake.type}<br>Flavour: ${cake.flavour}<br>Bakery: ${cake.bakery}<br>Rating: ${cake.rate}<br>Comment: ${cake.comment}</p>`;
        
        
        overlay.appendChild(modal);
        item.appendChild(overlay);
        // const overlay = document.querySelector(".overlay");
        overlay.onclick = function (e) { e.preventDefault(); e.stopPropagation(); this.parentElement.removeChild(this)};
        console.log(overlay.parentNode);
        console.log(overlay.parentElement, 'element')
    })


    // Clear the value of the input once the task has been added to the page
    form.reset();

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    delButton.onclick = function (event) {event.preventDefault(); event.stopPropagation(); deleteCake(this.parentElement.getAttribute('data-id')) }
    item.appendChild(delButton); // Adds a delete button to every task

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function (event) {

        entryList.forEach(function (cakeArrayElement, cakeArrayIndex) {
            if (cakeArrayElement.id == item.getAttribute('data-id')) {
                entryList.splice(cakeArrayIndex, 1)
            }
        })

        // Make sure the deletion worked by logging out the whole array
        console.log(entryList)

        item.remove(); // Remove the task item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element

    })
}

function save(name, type, flavour, rate, bakery, comment) {
    const cake = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        flavour,        
        rate,
        bakery,
        comment
    }

    const savedCakes = JSON.parse(localStorage.getItem(localStorageKey));

    let newCakesToSave;

    savedCakes ? (newCakesToSave = [cake, ...savedCakes]) : (newCakesToSave = [cake]);

    localStorage.setItem(localStorageKey, JSON.stringify(newCakesToSave));
};

function deleteCake (cakeId) {
    const savedCakes = JSON.parse(localStorage.getItem(localStorageKey));

    var i = savedCakes.length;
    while(i--) {

        if(savedCakes[i].id.toString() === cakeId) {
            savedCakes.splice(i, 1);
            break;
        }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(savedCakes));
} 

function addCake(name, type, flavour, rate, bakery, comment) {
    // Creating the object with the usual property:value syntax
    // Creating the object, directly passing in the input parameters
    const cake = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString(),
        flavour,        
        rate,
        bakery,
        comment
    }

    entryList.push(cake);
    displayCake(cake);
}

// Call the function with test values for the input paramaters
// addCake("Cake", "Sponge Cake", "Red Velvet", 5, "thumbs up");

// Log the array to the console.
console.log(entryList);


