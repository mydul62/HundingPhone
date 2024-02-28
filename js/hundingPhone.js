const loadPhoneDetails = async (searchItem,isShowAll) =>{
  const set =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem}`);
  const res = searchItem? set : await fetch(`https://openapi.programming-hero.com/api/phones?search=samsung`);
  const data =await res.json();
  const phones = data.data;
  phoneCardAdd(phones,isShowAll)
 
};

loadPhoneDetails();
      let innerContent=[];
const phoneCardAdd =(phones,isShowAll)=>{
  const phonesCardsId = document.getElementById('phones_cards');
  const showALlId = document.getElementById('show-all-container');
  
  if(phones.length){
    showALlId.classList.remove('hidden');
  }else{
    showALlId.classList.add('hidden')
  }
  if(!isShowAll){
    phones = phones.slice(0,6)
  }
  
   phones.map((phone)=>{
      innerContent += `<div class="card  bg-base-100 border ">
    <figure class="px-10 pt-10 text-[#0D6EFD0D]">
      <img src=${phone.image} />
    </figure>
    <div class="card-body items-center text-center space-y-2">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>${phone.slug}</p>
      <h3 class="text-2xl font-bold">$999</h3>
      <div class="card-actions">
        <button onclick = "showDetails('${phone.slug}')" class="bg-[#0D6EFD] px-4 py-2 rounded-md text-white">Show Details</button>
        <button onClick="cartCounter()" " class="bg-[#0D6EFD] px-4 py-2 rounded-md text-white">Add to Cart</button>
        
      </div>
    </div>
  </div>`
   });

   phonesCardsId.innerHTML = innerContent;
   loadingSpinner(false)
}

const phoneSearch=()=>{
  loadingSpinner(true)
  innerContent =[];
  const inputSearchId = document.getElementById('search-phone');
  const searchItem=inputSearchId.value;
  loadPhoneDetails(searchItem);
  inputSearchId.value = '';
}

const showAll=(isShowAll)=>{
  loadPhoneDetails(true);
}

const loadingSpinner=(isloading)=>{
  const spinner = document.getElementById('loading-spinner');
  if(isloading){
    spinner.classList.remove('hidden');
  }else{
    spinner.classList.add('hidden');
  }
}

const showDetails =async (id)=>{
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data =await res.json();
  const phones = data.data;
   console.log(phones)
  const modalBox = document.getElementById('Modal_container')
  modalBox.innerHTML = `<div>
  <div class="image flex justify-center  bg-[#0D6EFD0D]">
    <img src="${phones.image}" alt="">
  </div>
  <div class="discription ">
    <h3 class="font-bold text-2xl text-[#403F3F]">Iphone 13 Pro Max</h3>
  <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h3 class=" text-2xl text-[#403F3F]">Display Size : <span class=" text-xl text-[#706F6F]">${phones.mainFeatures.displaySize}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Chipset : <span class=" text-xl text-[#706F6F]">${phones.mainFeatures.chipSet}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Memory : <span class=" text-xl text-[#706F6F]">${phones.mainFeatures.memory}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Storage : <span class=" text-xl text-[#706F6F]">${phones.mainFeatures.storage}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Slug : <span class=" text-xl text-[#706F6F]">${phones.slug}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Release data : <span class=" text-xl text-[#706F6F]">${phones.releaseDate?phones.releaseDate : "Not available"}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">Brand : <span class=" text-xl text-[#706F6F]">${phones.brand}</span></h3>
  <h3 class=" text-2xl text-[#403F3F]">GPS :<span class=" text-xl text-[#706F6F]"> ${phones.others.GPS?phones.others.GPS : "Not available"}</span></h3>
  </div>

  <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </form>
  </div>
</div>

`
  my_modal_5.showModal();
}
let count = 0;
const cartCounter=()=>{
  count +=1;
  const cartCounterId = document.getElementById('counter') ;
  const itemCount = document.getElementById('itemCount');
  cartCounterId.innerText = parseInt(count);
  itemCount.innerText = parseInt(count);
}