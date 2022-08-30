const loadPhones = async (phoneBrand) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data)
}

const displayPhones = (phoneData) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ``;
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
    }


}

document.getElementById("btn-search").addEventListener("click", function () {
    const inputSearchField = document.getElementById("input-search");
    const inputSearchValue = inputSearchField.value;
    loadPhones(inputSearchValue);

})

loadPhones("a");
