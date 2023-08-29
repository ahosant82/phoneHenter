const loadPhone = async(srcTxt = "13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${srcTxt}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);

    displayPhones(phones, isShowAll);
}

// dispaly phones

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer= document.getElementById('phoneContainer');
    phoneContainer.textContent = '';

    // showAllSection container
    const showAllSection = document.getElementById('showAllSection');

    // 
    if(phones.length > 16 && !isShowAll){
        showAllSection.classList.remove('hidden');
    }
    else{
        showAllSection.classList.add('hidden')
    }
    // 

    if (!isShowAll) {
        phones = phones.slice(0,16);
    }
    
    // forEach fun
    phones.forEach(phone => {
    // console.log(phone);
    // cr div
    const phnCrd = document.createElement('div');

    phnCrd.classList = 'card bg-base-100 rounded-base	 py-2 shadow-sm border border-indigo-600 m-4';

    phnCrd.innerHTML = `
        <figure><img src="${phone.image}" alt="product Image" /></figure>
        <div class="card-body">
        <h2 class="card-title p-2">${phone.brand}</h2>
        <h2 class="card">${phone.phone_name}</h2>
        <div class="card-actions justify-start">
            <button onclick='shoeDetailsBtn("${phone.slug}");' class="btn btn-primary">Show Details</button>
        </div>
        </div>
    `;

    phoneContainer.appendChild(phnCrd);

    // loading close
    toggleSpner(false);

        
    });

}

const srcBtn = (isShowAll) =>{
    toggleSpner(true);
    const srcFild = document.getElementById('srcFild');
    const srcTxt = srcFild.value;
    loadPhone(srcTxt, isShowAll);
}

const toggleSpner = (isloading) =>{
    const loadSpner = document.getElementById('loadSpner');
    
    if (isloading) {
        loadSpner.classList.remove('hidden');
    }
    else(
        loadSpner.classList.add('hidden')
    )
}

const showAllBtn = () =>{
    srcBtn(true);
}



// show ditails btn
const shoeDetailsBtn = async(id)=>{
    // console.log(200, id);

    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();
    const phone = data.data;
    // console.log(data);
    showDetails(phone);

}

const showDetails = (phone) =>{
    show_details.showModal();
    console.log(phone);

    const detailsContainer = document.getElementById('detailsContainer');

    detailsContainer.classList.add('py-2');

    detailsContainer.innerHTML = `
                <div id="detailsContainer">
                    <div class="mx-auto text-center productTlt">
                        <figure class="product-img p-8 ">
                            <img src="${phone.image}" alt="products">
                        </figure>
                        
                        <h3 class="heading text-2xl p-2">
                            ${phone.name}
                        </h3>
                    </div>

                    <div class="product-body capitalize">
                        <p class="p-2 border border-gray-"><span class="py-2 text-1xl text-slate-600">chipSet: </span>${phone?.mainFeatures?.chipSet}</p>
                        <p class="p-2 bg-gray-200 border border-gray-400"><span class="py-2 text-1xl text-slate-600	">displaySize : </span>${phone?.mainFeatures?.displaySize}</p>
                        <p class="p-2 border border-gray-400"><span class="py-2 text-1xl text-slate-600	">memory : </span>${phone?.mainFeatures?.memory}</p>
                        <p class="p-2 bg-gray-200 border border-gray-400"><span class="py-2 text-1xl text-slate-600	">GPS : </span>${phone?.others?.GPS}</p>
                        <p class="p-2 border border-gray-400"><span class="py-2 text-1xl text-slate-600	">storage : </span>${phone?.mainFeatures?.storage}</p>

                        <p class="p-2 bg-gray-200 border border-gray-400"><span class="py-2 text-1xl text-slate-600	">slug : </span>${phone?.slug
                        }</p>
                    </div>
                </div>
    `;





}


// 
loadPhone();
