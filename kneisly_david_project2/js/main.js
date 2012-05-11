// Week 2, Project 2
// David Tyler Kneisly
// VFW 1205
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
        for (var i=0; i < radios.length; i++) {
            if (radios[i].checked) {
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

    function toggleControls(n) {
        switch(n) {
            case "on":
                $("form").style.display = "none";
                $("clear").style.display = "inline";
                $("displayLink").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("form").style.display = "block";
                $("clear").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }


    function storeData() {
        var id = Math.floor(Math.random()*100000001);
        // Gather up all our form field values and store in an object.
        // Object properties contain an arry with the form label and input values
        getSelectedRadio();
        getCheckboxValue();
        var item = {};
        item.grouping = ["Group:", $('select').value];
        item.titles = ["Title:", $('booktitle').value];
        item.authors = ["Author:", $('author').value];
        item.readpages = ["Pages:", $('pages').value];
        item.datefinished = ["Date Finished:", $('readdate').value];
        item.rating = ["Rating:", $('rateit').value];
        item.category = ["Genre:", genreValue];
        item.favs = ["Favorite:", favoriteValue];
        item.note = ["Notes:", $('notes').value];
        // Save data into Local Storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Book is saved!");
    }

    function showData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("No saved books!");
        } else {
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute('id','items');
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('item').style.display = 'display';
        for (var i=0, l = localStorage.length; i<l; i++) {
            var makeLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            for (var n in obj) {
                var makeSubLi = document.createElement("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
            }
        }
        }
    }

    function clearData() {
        if(localStorage.length === 0) {
            alert("No books to clear!");
        } else {
            localStorage.clear();
            alert("All books deleted!");
            window.location.reload();
            return false;
        }
    }
    
    // Variable defaults
    var bookGroups = ["--Choose a Source--", "Book", "EReader", "Tablet", "Online"],
    genreValue,
    favoriteValue = "No"
    ;
    makeCats();

    var saveBook = $('submit');
    saveBook.addEventListener('click', storeData);
    var displayBooks = $("display");
    displayBooks.addEventListener("click", showData);
    var clearBooks = $("clear");
    clearBooks.addEventListener("click", clearData);
    

} );