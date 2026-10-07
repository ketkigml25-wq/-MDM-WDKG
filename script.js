const itemsContainer = document.getElementById("itemsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const reportForm = document.getElementById("reportForm");
const successMessage = document.getElementById("successMessage");

let items = [
    {
        name: "Scientific Calculator",
        category: "Electronics",
        status: "Lost",
        location: "Computer Lab"
    },
    {
        name: "Engineering Mathematics Book",
        category: "Books",
        status: "Found",
        location: "Library"
    },
    {
        name: "College ID Card",
        category: "Documents",
        status: "Lost",
        location: "Main Gate"
    },
    {
        name: "Black Water Bottle",
        category: "Others",
        status: "Found",
        location: "Canteen"
    },
    {
        name: "USB Drive",
        category: "Electronics",
        status: "Lost",
        location: "Seminar Hall"
    },
    {
        name: "Blue Backpack",
        category: "Accessories",
        status: "Found",
        location: "Parking Area"
    }
];


// Display items
function displayItems() {

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredItems = items.filter(function(item) {

        const matchesSearch =
            item.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });


    itemsContainer.innerHTML = "";


    if (filteredItems.length === 0) {

        itemsContainer.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-gray-500">
                    No matching items found.
                </p>
            </div>
        `;

        return;
    }


    filteredItems.forEach(function(item) {

        const statusStyle =
            item.status === "Lost"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700";


        const card = document.createElement("div");

        card.className =
            "bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition";


        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">

                <div>
                    <h3 class="font-bold text-lg">
                        ${item.name}
                    </h3>

                    <p class="text-sm text-gray-500">
                        ${item.category}
                    </p>
                </div>

                <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}">
                    ${item.status}
                </span>

            </div>

            <p class="text-gray-600">
                📍 ${item.location}
            </p>

            <button
                onclick="contactStudent('${item.name}')"
                class="mt-5 w-full border border-blue-600
                       text-blue-600 py-2 rounded-lg
                       hover:bg-blue-50">
                Contact
            </button>
        `;

        itemsContainer.appendChild(card);
    });
}


// Search
searchInput.addEventListener("input", displayItems);


// Category filter
categoryFilter.addEventListener("change", displayItems);


// Report new item
reportForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newItem = {
        name: document.getElementById("itemName").value,
        category: document.getElementById("itemCategory").value,
        status: document.getElementById("itemStatus").value,
        location: document.getElementById("itemLocation").value
    };

    items.push(newItem);

    reportForm.reset();

    successMessage.classList.remove("hidden");

    displayItems();

    setTimeout(function() {
        successMessage.classList.add("hidden");
    }, 3000);
});


// Contact button
function contactStudent(itemName) {

    alert(
        "Contact option selected for: " +
        itemName +
        "\nPlease contact the college Lost & Found desk."
    );
}


// Scroll to report section
function scrollToReport() {

    document.getElementById("reportSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Initial display
displayItems();