function getItems()
{
	// See if items is inside localStorage
	if (localStorage.getItem("groceries"))
	{
		// If yes, then load the existing courses
		items = JSON.parse(localStorage.getItem("groceries"));
	}
	else
	{
		// Make a new array of items
		items = new Array();

		// Save into local storage
		localStorage.setItem("groceries", JSON.stringify(items));
	}

	return items;
}

function saveItems(items)
{
	// Save the list into localStorage
	localStorage.setItem("groceries", JSON.stringify(items));
}

function add()
{
	// Retrieve the entered form data
	var product = $('[name="product"]').val();

	// Fetch the existing items
	items = getItems();

	// Push the new item into the existing list
	items.push({
		product: product,
		quantity: 1
	});

	// Store the new list
	saveItems(items);

	// Reload the page to show the new item
	window.location.reload();
}

function edit()
{
	// Retrieve the entered form data
	var id = window.location.href.split('?')[1];
	var product = $('#product').val();
	var quantity = $('#quantity').val();

	// Fetch the existing items
	items = getItems();

	// Push the new item into the existing list
	items[id] = {
		product: product,
		quantity: quantity
	};

	// Store the new list
	saveItems(items);
}

function remove()
{
	// Find the requested id
	var id = window.location.href.split('?')[1];

	// Fetch the existing items
	items = getItems();

	// Remove the item from the list
	items.splice(id, 1);

	// Store the new list
	saveItems(items);
}

function homepage()
{
	// Fetch the existing items
	items = getItems();

	// Only render the list when we have items in our storage
	if (items.length > 0)
	{
		// Clear the list
		$('#items').find('li').remove();

		// Add every item to the items list
		$.each(items, function(index, item)
		{
			element = $('<li><a href="view.html?' + index + '">' + item.product + ' <span class="ui-li-count">' + item.quantity + '</span></a><a class="increase" href="#" data-id="' + index + '">Add more</a></li>');

			if (item.done)
			{
				element.css('opacity', .5);
			}

			$('#items').append(element);
		});

		// Let jQuery re-render our list
		$('#items').listview('refresh');
	}
}

function view(id)
{
	// Fetch all the items
	items = getItems();

	// Find the requested item
	item = items[id];

	// Populate the page
	$('#product').val(item.product);
	$('#quantity').val(item.quantity);
}

function increase(id)
{
	// Fetch all the items
	items = getItems();

	// Find the requested item
	item = items[id];

	// Increase the quantity
	item.quantity = (item.quantity) ? parseInt(item.quantity) + 1 : 1;

	// Write back to the item list
	items[id] = item;

	// Write back to the storage
	saveItems(items);

	// Reload the page
	window.location.reload();
}

// Listen for events
$(document).on('pagebeforeshow', '#home', function(event)
{
	homepage();
});

$(document).on('pagebeforeshow', '#view', function(event)
{
	// Retrieve the requested id from the URL
	id = window.location.href.split('?')[1];

	// Load the requrested item
	view(id);
});

$(document).on('click', '#edit', function()
{
	edit();
});

$(document).on('click', '#remove', function()
{
	remove();
});

$(document).on('click', '.increase', function()
{
	id = $(this).data('id');

	increase(id);
});
