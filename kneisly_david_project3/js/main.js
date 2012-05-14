// Week 3, Project 3
// David Tyler Kneisly
// VFW 1205
// Book Tracker

// Wait until the DOM is ready
window.addEventListener('DOMContentLoaded', function() {


	// getElementById Function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	// Create 'Select Field' element, and populate with options
	function makeCats () {
		var formTag = document.getElementsByTagName('form'),
		// This will become an array of all the form tags in the additem.html doc.
		selectLi = $('select');
		makeSelect = document.createElement('select');
		makeSelect.setAttribute('id', 'groups');
		for (var i=0, j=bookGroups.length; i < j; i++) {
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
		var radios = document.forms[0].genre;
		for (var i=0; i < radios.length; i++) {
			if (radios[i].checked) {
				genreValue = radios[i].value;
			}
		}
	}

	// Find value of selected checkboxes.
	function getCheckboxValue() {
		if ($('favorite').checked) {
			favoriteValue = $('favorite').value;
		} else {
			favoriteValue = "No";
		}
	}

	// Toggle controls
	function toggleControls(n) {
		switch(n) {
			case 'on':
				$('bookForm').style.display = 'none';
				$('clear').style.display = 'inline';
				$('display').style.display = 'none';
				$('addNew').style.display = 'inline';
				break;
			case 'off':
				$('bookForm').style.display = 'block';
				$('clear').style.display = 'inline';
				$('addNew').style.display = 'none';
				$('item').style.display = 'none';
				break;
			default:
				return false;
		}
	}

	// Store Data
	function storeData() {
		var id = Math.floor(Math.random()*100000001);
		getSelectedRadio();
		getCheckboxValue();
		// Gather up all the form field values and store in an object.
		// Object properties contain an array with the form label and input values
		var item = {};
		item.groups = ['Group:', $('groups').value];
		item.titles = ['Title:', $('booktitle').value];
		item.authors = ['Author:', $('author').value];
		item.readpages = ['Pages:', $('pages').value];
		item.datefinished = ['Date Finished:', $('date').value];
		item.rating = ['Rating:', $('rating').value];
		item.category = ['Genre:', genreValue];
		item.favs = ['Favorite:', favoriteValue];
		item.note = ['Notes:', $('notes').value];
		localStorage.setItem(id, JSON.stringify(item));
		// Data is saved into Local Storage; Using 'Stringify' to convert the object into a string
		alert('Book is saved!');
	}

	// Show Data
	function showData () {
		toggleControls('on');
		if (localStorage.length === 0) {
			alert('No saved books');
		} else {
			// Write data from Local Storage to browser
			// The next 4 lines create a container (div & ul) for writing data to
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute('id', 'items');
			var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			// Below for-loop looks in Local Storage for data
			for (var i=0, l=localStorage.length; i < l; i++) {
				var makeLi = localStorage.key(i);
				makeList.appendChild(makeLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				// Below variable converts the string from Local Storage back into an object
				var obj = JSON.parse(value);
				// Below variable and for-loop creates a sub-list and appends to the above list (li)
				var makeSubList = document.createElement('ul');
				makeLi.appendChild(makeSubList);
				for (var n in obj) {
					var makeSubLi = document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubLi.innerHTML = optSubText;
				}
			}
		}
	}

	// Clear Data
	function clearData() {
		if(localStorage.length === 0) {
			alert('No books to clear');
		} else {
			localStorage.clear();
			alert('All books deleted');
			window.location.reload();
			return false;
		}
	}

	// Defaults for Variables
	var 
	bookGroups = ["--Choose a Platform--", "Book", "EReader", "Tablet", "Online"],
	genreValue,
	favoriteValue = "No"
	;
	
	makeCats();

	var saveBook = $('submit');
	saveBook.addEventListener('click', storeData);
	var displayBooks = $('display');
	displayBooks.addEventListener('click', showData);
	var clearBooks = $('clear');
	clearBooks.addEventListener('click', clearData);
	
});