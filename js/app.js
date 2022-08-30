const loadPhones = async (phoneBrand, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}


const displayPhones = (phoneData, dataLimit) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ``;

    // Show All button and Data Limit
    const showAll = document.getElementById("show-all");
    if (dataLimit && phoneData.length > 10) {
        phoneData = phoneData.slice(0, 10);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }

    const noPhoneFound = document.getElementById("no-phone-found");
    if (phoneData.length === 0) {
        noPhoneFound.classList.remove("d-none");
        toggleSpinner(false);
    }
    else {
        noPhoneFound.classList.add("d-none");
    }
    for (const phone of phoneData) {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div" class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
                </button>
            </div>
            
        </div>
         `
        phoneContainer.appendChild(phoneDiv);
        // stop spinner
        toggleSpinner(false);
    }
}

// Function to process Data
const processData = (dataLimit) => {
    // Start Spinner
    toggleSpinner(true);
    // Collect User Input Value
    const inputSearchField = document.getElementById("input-search");
    const inputSearchValue = inputSearchField.value;
    loadPhones(inputSearchValue, dataLimit);
}

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phoneSlug) => {
    console.log(phoneSlug);

    const phoneDetialsModalContainer = document.getElementById("phone-details-modal");
    phoneDetialsModalContainer.innerHTML = ``;
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal-content");
    modalDiv.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${phoneSlug.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p class="text-secondary">Chipset: ${phoneSlug.mainFeatures.chipSet}</p>
            <p class="text-secondary">Display: ${phoneSlug.mainFeatures.displaySize}</p>
            <p class="text-secondary">Memory: ${phoneSlug.mainFeatures.memory}</p>
            <p class="text-secondary">Storage: ${phoneSlug.mainFeatures.storage}</p>
        </div>
        <div class="modal-footer">
        <h5>${phoneSlug.releaseDate ? phoneSlug.releaseDate : "Release Date Information not Avaiable"} </h5>
        </div>
    
    `
    phoneDetialsModalContainer.appendChild(modalDiv);

}


// Search Button Event Handler
document.getElementById("btn-search").addEventListener("click", function () {
    processData(10);
})

// Show All Button Event Handler
document.getElementById("btn-show-all").addEventListener("click", function () {
    processData();
})

// Enter Key eventListener
document.getElementById("input-search").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        processData(10);
    }
})
// Show Spinner Function
const toggleSpinner = (isLoading) => {
    const spinnerDiv = document.getElementById("spinner");
    if (isLoading) {
        spinnerDiv.classList.remove("d-none");
    }
    else {
        spinnerDiv.classList.add("d-none");
    }
}

loadPhones("a", 10);
