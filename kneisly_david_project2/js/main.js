// Week 2, Project 2
// David Tyler Kneisly
// VFW 1204
// Book Tracker

// Wait until the DOM is ready
window.addEventListener('DOMContentLoaded', function() {


    // getElementById Function
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

    // Create 'Select Field' element, and populate with options
    function makeCats () {
        var formTag = document.getElementsByTagName('form'),
        // This will become an array of all the form tags in the additem.html doc.  Since there's only one, it would be an array of one item.
        selectLi = $('select'),
        makeSelect = document.createElement('select');
        makeSelect.setAttribute('id', 'groups');
        for(var i=0, j=bookGroups.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optText = bookGroups[i];
            makeOption.setAttribute('value', optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

    // Find value of selected radio button.
    function getSelectedRadio() {
        var radios = document.form[0].genre;
        for(var i=0; i < radios.length; i++) {
            if(radios[i].checked) {
                genreValue = radios[i].value;    
            }
        }
    }

    function getCheckboxValue() {
        if ($('favorite').checked){
            favoriteValue = $('favorite').value;
        } else {
            favoriteValue = "No";
        }
    }

    function storeData() {
        var id = Math.floor(Math.random()*100000001);
        // Gather up all our form field values and store in an object.
        // Object properties contain an arry with the form label and input values
        getSelectedRadio();
        getCheckboxValue();
        var item = {};
        item.group = ["Group:", $('groups').value];
        item.booktitle = ["Title:", $('booktitle').value];
        item.author = ["Author:", $('author').value];
        item.pages = ["Pages:", $('pages').value];
        item.readdate = ["Date Finished:", $('readdate').value];
        item.rateit = ["Rating:", $('rateit').value];
        item.genre = ["Genre:", genreValue];
        item.favorite = ["Favorite:", favoriteValue];
        item.notes = ["Notes:", $('notes').value];
        // Save data into Local Storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Book is saved!");
    }
    
    // Variable defaults
    var bookGroups = ["--Choose a Source--", "Book", "EReader", "Tablet", "Online"],
    genreValue,
    favoriteValue = "No"
    ;
    makeCats();

    // Set link & Submit Click Events
    /*
    var displayLink = $('display');
    displayLink.addEventListener('click', getData);
    var clearLink = $('clear');
    clearLink.addEventListener('click', clearLocal);
    */
    var saveLink = $('submit');
    saveLink.addEventListener('click', storeData);
    

} );