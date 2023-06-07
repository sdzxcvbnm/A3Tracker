# A3Tracker

# Development Documentation
This App Design is in response to the Web App Design Assessment for DECO2017. The context of this tracking application is for context 3.Food and Cooking. 
I've reduced the scope by focusing primarily on different types of cakes that users can track.

The purpose of this tracking website is for users to track, document, and have a location to store information about specific cakes. This will allow users to be able to have physical data of their feelings towards that cake, and who made it, or where it was bought from. 
This will help them to remember, and determine if they would like to repurchase that cake, or try out more items from a location that they may like the cake from. 
This site will also help users to easily compare cakes and bakeries, remember what cakes they have had on certain occasions or dates, or when they've last had dessert, in which it can help give them a brief idea of their dietary habits.

On this site, users will be able to input the details in the section on the left. These information are: The personal name the user gives to the cake, the cake type, flavour, rating, the bakery, and a comment. When the user clicks the 'Add Cake!' button, the entry is saved to the right section, with limited information shown.
Users are able to leave the page, and the entry will still remain on the site.
Users can click on the entry, and a popup window will appear with the full details of the cake.
Users can delete the entry from the main page, or click on the entry, and delete it from there.


# Design
The design of this webiste features a single page architecture, with all the functionality being presented on the one page.

Taking into consideration of the feedback received from assessment: Web Art Design, the location of the tracked entries are moved from the bottom of the page to the top, on the right side; so that users are able to see all their entries upon opening the page.

The user input for the cake flavours are changed from a dropdown selection box, to a text field, so that suers have more freedom in the different flavours of cakes. The text size and colours have also been adjusted to make it easier to read. 

# Note
The site was created using Visual Studio Code, using Javascript, CSS, and HTML. The site was viewed on Google Chrome during coding, and done using a Macbook Air, with a 13in screen. 
Fonts are imported from Google Fonts. The font used is Poppins.


# Prototype (Process)
1. Created the Git, the folders, and backend.
2. I started off this site with referencing and cloning some aspects of https://github.com/robdongas/deco2017-task-tracker
    I adjusted the html, css, and javascript, accordingly to the data modal of my site. 
3. Added a localstorage
4. Created modal
5. Deletion function
6. Star rating 
7. Adjusting css. Fixed flex wrap for phone screens and smaller screensizes. 

# Issues and Challenges
There were some design elements that i was unable to incorporate due to lack of time, and not being able to get the code to work. 
I ran into a few issues when coding the delete buttons, with it sometimes disappearing, or not working properly.
I was also unable to incoporate the cake images, where a specific image would be allocated to the entry depending on the information/data.



# Codes
## Local Storage
using a local storage to save the data entries onto the site, for persistent access between sessions.

``` Javascript
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
``` 

Sites used:
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://www.w3schools.com/jsref/met_storage_getitem.asp
https://www.freecodecamp.org/news/how-to-loop-through-an-array-in-javascript-js-iterate-tutorial/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

## Modal 
Creating a modal: a dialog box/popup window that is displayed. The model is set in Javascript and CSS is used to design the modal. The information that is shown in the modal comes from cake elements that are saved.

InnerHTML is used to set the html of the modal.
<em> <h2> <p> are used to differenciate the display of the texts.

```Javascript
 const modal = document.createElement("model");
        modal.classList.add('modal');
        modal.innerHTML = `
            <h2>
                ${cake.name}
            </h2>
            <br>
            <h3>
                <em>ID: ${cake.id}
                <br>
                <b>Date:</b> ${cake.date}</em> 
            </h3> 
            <p>
                <br>
                <b>Type:</b>    ${cake.type}<br>
                <b>Flavour:</b> ${cake.flavour}<br>
                <b>Bakery:</b>  ${cake.bakery}<br>
                <b>Rating:</b>  ${cake.rate}<br>
                <b>Comment:</b> ${cake.comment}
            </p>`;
```

Sites used; 
https://www.w3schools.com/howto/howto_css_modals.asp 
https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/ 

## Continuation of Modal + modal delete button
Having a delete button inside the modal. Using css to position the delete button. 
Created 'delButtonContainer' to be able to style the button, and make a container for it to sit inside of and give the container a css class. As having a container makes it easier to position on the page and keeps the structure of the page more clean.

Added the container to the 'modal', so that it will render, anad added the modal into overlaay; so tjat the popup box will render ontop of a dark, blurred background.

Assign an 'onClick' to the overlay so that the user can click on the area outside of the popup, and registered it so that when they click, the overlay component is removed and the popup modal goes away.

'e.stopPropagation' is there so that overlay is still technically inside of the popup cake detail box, and to prevent the click from going through the overlay and gets registered that the modal was clicked and another overlay and popup will appear.

 ``` Javascript
 const delButtonContainter = document.createElement("div");
        const copiedDelButton = delButton.cloneNode(true);

        copiedDelButton.addEventListener("click", function (event) {
            event.stopPropagation();
            entryList.forEach(function (cakeArrayElement, cakeArrayIndex) {
                if (cakeArrayElement.id == item.getAttribute('data-id')) {
                    entryList.splice(cakeArrayIndex, 1)
                }
            })
            
            // Make sure the deletion worked by logging out the whole array
            console.log(entryList)
            deleteCake(item.getAttribute('data-id'));
            item.remove();
              })

 const delButtonContainter = document.createElement("div");
        delButtonContainter.classList.add('delButtonContainer');
        delButtonContainter.appendChild(delButton);
        modal.appendChild(delButtonContainter);      
```

Sites used:
https://www.w3schools.com/jsref/met_node_clonenode.asp
https://www.w3schools.com/jsref/met_element_remove.asp
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback

## Star Rating
Creating the star rating system, so that users are able to view the star and input their rating, in which the data is collected and saved. As i ran into issues, the rating is converted into numbers (0-5) on the saved entry, and is not shown as stars. 

``` Javascript
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
```

Sites used:
https://stackoverflow.com/questions/49218516/creating-simple-star-rating-using-click-event-javascript
https://stackoverflow.com/questions/38238398/display-stars-instead-of-radio-buttons

## Smaller screens
 Adjusting css elements so that the elements will move to fit a phone screen or smaller screen sizes; by using display: flex;, margins, paddings, widths and positions.

# Recommendations
1. Implementing images: As according to the original design, a cake image would be allocated to the entry based on the cake type.
2. A popup to confirm if the user if the user is sure about deleting the entry, before the entry is permanently deleted.
3. The main screen stating that there are no entries, when it is the user's first time on the site, and they have yet to add any entry.

4. Having a clear design is helpful. I'd recommend having the design of the page created through sites like; Figma.com, and the data model of the site is completed. Get feedback from friends, family, tutors, and the feedback from the previous assignment to make positive adjustments to the design, and if any user inputs should be changed. 
5. Creating the HTML, and CSS first. So that everything that should be on the site is there, and the functions can be added in later.
