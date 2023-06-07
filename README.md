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
# Design Patterns + Principles + Accessibility & Usability
*

# Prototype (Process)


# Codes
## Delete Function
 Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    // delButton.onclick = function (event) {event.preventDefault(); event.stopPropagation(); deleteCake(this.parentElement.getAttribute('data-id')) }
    // item.appendChild(delButton); // Adds a delete button to every task
    // btnContainer.appendChild(delButton);
    item.appendChild(delButton);

    // Listen for when the delete button is clicked
     delButton.addEventListener("click", function (event) {
        event.stopPropagation();
        entryList.forEach(function (cakeArrayElement, cakeArrayIndex) {
            if (cakeArrayElement.id == item.getAttribute('data-id')) {
                entryList.splice(cakeArrayIndex, 1)
            }
        })
        
        // Make sure the deletion worked by logging out the whole array
        console.log(entryList)
        deleteCake(item.getAttribute('data-id'));
        item.remove(); // Remove the task item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element
    })
    ```





# Issues