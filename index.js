'use strict';

/*

    Todo:
        - Usable click to toggle full-size vs zoomed-size for each image? (Not sure how it would work.)

    Notes:
        - blah.forEach may fail if blah is not "actually" an array, but is rather an array-like object.
            - So iterate over blah another way instead!

        - Need to understand how/why dot notation works/is preferable for various things (e.g. element.value = '', etc.)

*/

function makeGallerySquare() {

    // this will break when you change the CSS to make the gallery work differently, which is coming up shortly...
    // you might be able to use a .querySelector method instead of the current approach...

    const squareGalleryElements = document.getElementsByClassName('gallery-square');

    for (let i = 0; i < squareGalleryElements.length; i++){

        //const children = squareGalleryElements[i].children;

        let images = squareGalleryElements[i].getElementsByTagName('img');

        let tallest = 0;

        for (let j = 0; j < images.length; j++){

            let styles = window.getComputedStyle(images[j]);

            let heightString = styles.getPropertyValue('height');

            let height = Number(heightString.split('px')[0]);

            if (height > tallest) { tallest = height; }

            //console.log(height);

        } // end of images loop

        //console.log(tallest);

        // set the width of each gallery element to the same value as the height of the tallest image
        let listItems = squareGalleryElements[i].getElementsByTagName('li');

        for (let j = 0; j < listItems.length; j++){

            listItems[j].style.setProperty('width', tallest);
            console.log(listItems[j]);

        }

    } // end of square gallery elements loop

}


function zoomer() {

    const zoomResetValue = 20; // todo: have this defined in one place only (so, not separately in the HTML)

    const zoomElement = document.getElementById('zoom');
    const zoomResetButton = document.getElementById('resetzoom');

    const zoomAmountLabelElement = document.getElementById('zoomamountlabel');

    const galleryElements = document.getElementsByClassName('gallery-zoomable');
    let galleryListItems = [];

    for (let i = 0; i < galleryElements.length; i++){
        galleryListItems.push(galleryElements[i].querySelectorAll('li'));
    }

    function doZooming(event) {

        // need to understand why event.target.blah works :P
        let percent = event.target.value;

        if (event.target.id === 'resetzoom') {
            percent = zoomResetValue;
            zoomElement.value = zoomResetValue;
        } 

        zoomAmountLabelElement.innerHTML = `${percent}%`;

        for (let i = 0; i < galleryListItems.length; i++){
            for (let j = 0; j < galleryListItems[i].length; j++){
                galleryListItems[i][j].style.setProperty('width', `${percent}%`);
            }
        }

    }

    zoomElement.addEventListener('input', doZooming); // Know your events! 'input' is an important one ;¬)

    zoomResetButton.addEventListener('click', doZooming);

    zoomResetButton.click();

}


function windowLoaded() {

    //makeGallerySquare();

    zoomer();

} // end of function windowLoaded
