For the slideshow task, I followed the instructions in the lab sheet. I started by creating a div and gave it a class `.slideshow-container` instead of container to avoid potential conflicts in the future with other container classes which I may add in style.css. 

Inside the container, I added the next and previous buttons and also added `div.slide`s which contain an image and a slide number div. I pasted the provided css in a style tag instead of a stylesheet as there wasn't enough to warrant a new file and I didn't want to create a new file for just a few lines of code. I also updated it to match the naming choices I made.

I then created a javascript file to take implement the slideshow's functionality. I started by getting the slideshow container with a query selector as well as the previous and next buttons.

I decided to dynamically set the slide numbers instead of hard coding them as it's less work and will update automatically in the future. So I query the slideshow container for all the slides using `querySelectorAll` and then loop through them and set their slide number to their index + 1 out of the slides length.

I created a function updateSlides which takes in an index and hides all the slides then enables the one with the updated index. I added next and previous functions which update the index (taking into account the first and last slide edge cases) and then call this function.

I then added event listeners to the buttons which I got earlier and set the functions to the ones I created earlier.

I then call the update slides with index 0 to default to showing the first slide.

However, since the buttons are `<a>` tags, they reloaded the page so I updated the next and prev functions to take in an event and call `preventDefault()` on it to stop the page from reloading.

I also added all this code in a `domcontentloaded` listener to ensure all the dom elements are loaded before I try to access them to avoid errors.