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
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
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



// Search Button Event Handler
document.getElementById("btn-search").addEventListener("click", function () {
    processData(10);
})

// Show All Button Event Handler
document.getElementById("btn-show-all").addEventListener("click", function () {
    processData();
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

loadPhones("a");
