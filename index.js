/*** Dark Mode ***/

// Step 1: Select the theme button
  let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  }

// Step 3: Register a 'click' event listener for the theme button, and tell it to use toggleDarkMode as its callback function
  themeButton.addEventListener("click", toggleDarkMode);

//---------------------------------------------------------------------



/*** Form Handling *** 
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.
***/

// Step 1: Add your query for the submit RSVP button here
    let rsvpButton = document.getElementById("rsvp-button");
    let count = 3;
    
// Step 2: Write your code to manipulate the DOM here
  // Get form input values
    const addParticipant = ( person) => {

  // Create a new <p> element
    let newParticipant = document.createElement("p");

  // Set the text content
    newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;

  // Find the rsvp-participants div and add the new <p> to it
    let participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    let oldCount = document.getElementById("rsvp-count");
    
    oldCount.remove();
    
    count = count + 1;

    let newCount = document.createElement("p");
    newCount.id = "rsvp-count";
    newCount.textContent = "⭐ " + count + " people have RSVP'd to this event!";

    participantsDiv.appendChild(newCount);

    event.preventDefault();

  }



/*** Form Validation ***
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  let rsvpInputs = document.getElementById("rsvp-form").elements;

  // Create a person object from form inputs
  let person = {
    name: rsvpInputs[0].value,
    email: rsvpInputs[1].value,
    state: rsvpInputs[2].value
  };

  // Loop through each property in the person object to validate
  for (let key in person) {
    let value = person[key];
    let input = document.getElementById(key); // Match input IDs to object keys

    if (value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  // Additional email check
  let userEmail = document.getElementById("email");
  if (!person.email.includes(".com") || !person.email.includes("@")) {
    containsErrors = true;
    userEmail.classList.add("error");
  } else {
    userEmail.classList.remove("error");
  }

  // If no errors, add participant and clear inputs
  if (!containsErrors) {
    addParticipant( person);
    toggleModal(person);
    // Clear all input fields
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
}


// Step 3: Replace the form button's event listener with a new one that calls validateForm()

  rsvpButton.addEventListener("click", validateForm);



//-------------------------------------------------------------------------------------------------------------------------------------------

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

***/

const toggleModal = (person) => {
    let modal = document.getElementById("success-modal");
    let modalContent = document.getElementById("modal-text");

    modal.style.display = "flex";
    
    // Update modal text to personalized message
    modalContent.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;
    
    // Start the animation when modal appears
    let intervalId = setInterval(animateImage, 500); // Call animateImage every 500ms (half second)
    
    // Set modal timeout to 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId); // Stop the animation when modal closes
    }, 5000)
} 

// Animation variables and animateImage() function
let rotateFactor = 0;
let modalImage = document.querySelector(".modal-item"); // Fixed: added the dot for class selector

const animateImage = () => {
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    
    // Apply the rotation to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;

}