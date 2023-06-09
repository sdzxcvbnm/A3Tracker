// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("cakeform");
const cakelist = document.getElementById("cakelist");

const rating1 = document.getElementById("rating1");
const rating2 = document.getElementById("rating2");
const rating3 = document.getElementById("rating3");
const rating4 = document.getElementById("rating4");
const rating5 = document.getElementById("rating5");
var ratingValue = 0;

const ratingContainer = document.getElementById("ratings");

rating1.addEventListener("click", (evt) => {
  ratingValue = 5;
});
rating2.addEventListener("click", (evt) => {
  ratingValue = 4;
});
rating3.addEventListener("click", (evt) => {
  ratingValue = 3;
});
rating4.addEventListener("click", (evt) => {
  ratingValue = 2;
});
rating5.addEventListener("click", (evt) => {
  ratingValue = 1;
});

const localStorageKey = "DECO2017.SDAN5477.Cakes";
let entryList = [];
const saved = localStorage.getItem(localStorageKey);
const parsedSaved = JSON.parse(saved);
if (parsedSaved) {
  entryList = parsedSaved;

  for (const cake in parsedSaved) {
    displayCake(parsedSaved[cake]);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  save(
    form.elements.cakeName.value,
    form.elements.cakeType.value,
    form.elements.cakeFlavour.value,
    ratingValue,
    form.elements.cakeBakery.value,
    form.elements.cakeComment.value
  );

  addCake(
    form.elements.cakeName.value,
    form.elements.cakeType.value,
    form.elements.cakeFlavour.value,
    ratingValue,
    form.elements.cakeBakery.value,
    form.elements.cakeComment.value
  );
  ratingValue = 0;
  console.log(entryList);
});

function displayCake(cake) {
  let item = document.createElement("li");
  item.setAttribute("data-id", cake.id);
  item.innerHTML = `
    <h2>
        ${cake.name}
    </h2>
    <p>
        <b>Type:</b>    ${cake.type}<br>
        <b>Flavour:</b> ${cake.flavour}<br>
        <b>Bakery:</b>  ${cake.bakery}<br>
        <b>Rating:</b>  ${cake.rate}<br>
        <em>Date: ${cake.date}</em><br>
    </p>`;

  entrylist.appendChild(item);

  const btnContainer = document.createElement("div");

  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  // delButton.onclick = function (event) {event.preventDefault(); event.stopPropagation(); deleteCake(this.parentElement.getAttribute('data-id')) }
  // item.appendChild(delButton); // Adds a delete button to every task
  // btnContainer.appendChild(delButton);
  item.appendChild(delButton);

  delButton.addEventListener("click", function (event) {
    event.stopPropagation();
    entryList.forEach(function (cakeArrayElement, cakeArrayIndex) {
      if (cakeArrayElement.id == item.getAttribute("data-id")) {
        entryList.splice(cakeArrayIndex, 1);
      }
    });

    deleteCake(item.getAttribute("data-id"));
    item.remove(); // Remove the task item from the page when button clicked
  });

  item.addEventListener("click", (evt) => {
    // alert(`you've clicked ${cake.name}`);
    const overlay = document.createElement("div");

    overlay.classList.add("overlay");

    const modal = document.createElement("model");
    modal.classList.add("modal");
    modal.innerHTML = `
            <h2>
                ${cake.name}
            </h2>
            <h3>
                <em>
                <b>Date:</b> ${cake.date}
                <br>
                ID: ${cake.id}
                </em>
            </h3> 
            <img src="image folder/cake1.png" alt= cake>
            <h4>
                <strong>Type:</strong>    ${cake.type}<br>
                <strong>Flavour:</strong> ${cake.flavour}<br>
                <strong>Bakery:</strong> ${cake.bakery}<br>
                <strong>Rating:</strong> ${cake.rate}<br>
                <strong>Comment:</strong> ${cake.comment}<br><br>
            </h4>`;

    const delButtonContainter = document.createElement("div");
    const copiedDelButton = delButton.cloneNode(true);

    copiedDelButton.addEventListener("click", function (event) {
      event.stopPropagation();
      entryList.forEach(function (cakeArrayElement, cakeArrayIndex) {
        if (cakeArrayElement.id == item.getAttribute("data-id")) {
          entryList.splice(cakeArrayIndex, 1);
        }
      });

      deleteCake(item.getAttribute("data-id"));
      item.remove(); // Remove the task item from the page when button clicked
    });

    delButtonContainter.classList.add("delButtonContainer");
    delButtonContainter.appendChild(copiedDelButton);

    modal.appendChild(delButtonContainter);
    overlay.appendChild(modal);

    item.appendChild(overlay);
    // const overlay = document.querySelector(".overlay");
    overlay.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.parentElement.removeChild(this);
    };
  });

  // Clear the value of the input once the task has been added to the page
  form.reset();
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
    comment,
  };

  const savedCakes = JSON.parse(localStorage.getItem(localStorageKey));

  let newCakesToSave;

  savedCakes
    ? (newCakesToSave = [cake, ...savedCakes])
    : (newCakesToSave = [cake]);

  localStorage.setItem(localStorageKey, JSON.stringify(newCakesToSave));
}

function deleteCake(cakeId) {
  const savedCakes = JSON.parse(localStorage.getItem(localStorageKey));

  var i = savedCakes.length;
  while (i--) {
    if (savedCakes[i].id.toString() === cakeId) {
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
    date: new Date().toISOString().slice(0, 10),
    flavour,
    rate,
    bakery,
    comment,
  };

  entryList.push(cake);
  displayCake(cake);
}

// Call the function with test values for the input paramaters
addCake(
  "Test Cake Entry",
  "Sponge Cake",
  "Vanilla",
  5,
  "18 Bakery St",
  "Sed ut perspiciatis unde laudansi sio. Nemo enim ipsam voluptatem quia voled quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
);
