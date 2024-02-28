const loadPhoneDetails = async (searchItem,isShowAll) =>{
  const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem}`);
  const data =await res.json();
  const phones = data.data;
  console.log(phones)
  phoneCardAdd(phones,isShowAll)
};

loadPhoneDetails();
      let innerContent=[];
      let count = 0;
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
        <button onclick = "showDetails();" class="bg-[#0D6EFD] px-4 py-2 rounded-md text-white">Show Details</button>
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

const showDetails = ()=>{
  my_modal_5.showModal();
}