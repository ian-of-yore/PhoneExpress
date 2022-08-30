const loadPhones = async (phoneBrand) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data)
}

const displayPhones = (phoneData) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ``;
    // Show Only 10 Phones
    phoneData = phoneData.slice(0, 10);
    // Show if no phone is found
    const noPhoneFound = document.getElementById("no-phone-found");
    if (phoneData.length === 0) {
        noPhoneFound.classList.remove("d-none");
        // stop spinner
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

document.getElementById("btn-search").addEventListener("click", function () {
    // Start Spinner
    toggleSpinner(true);
    // Collect User Input Value
    const inputSearchField = document.getElementById("input-search");
    const inputSearchValue = inputSearchField.value;
    loadPhones(inputSearchValue);

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
