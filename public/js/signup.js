let fname = document.querySelector('.fname');
let lname=document.querySelector('.lname');
let email=document.querySelector('.email');
let password=document.querySelector('.password');
let loaderContainer =document.querySelector('.loader-container');
let actual_msg =document.querySelector('.actual_msg');
// import pop_close from './general.js';



function pop_close(elem_class){
  let elem=document.querySelector(elem_class);
  elem.classList.toggle('hidden');
  console.log('pop_close')
}

function close_msg(){
  pop_close('.msg');
  loaderContainer.style.display='none';
}



function signupSubmit(event){
  event.preventDefault();
  loaderContainer.style.display='flex';
  pop_close('.lds-ellipsis');
  console.log('added loader');

  let data={
    fname:fname.value,
    lname:lname.value,
    email:email.value,
    password:password.value
  }

  // if(validator.isEmail(data.email)){

  fetch('http://localhost:3000/signup',{
    method: 'POST',
    headers:{
      'Content-Type':'application/JSON'
    },
    body:JSON.stringify(data),
  })
  .then((response) => response.json())
  .then(res=>{

    console.log('res');
    if(res.status=='true'){
    window.location.href = res.next;
    pop_close('.lds-ellipsis');
    loaderContainer.style.display='none';
console.log('going good')
   }else{
    console.log('res.err');
    pop_close('.msg');
    pop_close('.lds-ellipsis');

    // actual_msg.innerText=res.err;
    loaderContainer.style.display='flex';
    console.log('error -2');
    }
  })
  .catch((error) => {
    pop_close('.lds-ellipsis');
    pop_close('.msg');

  actual_msg.innerText='Something went wrong';
  loaderContainer.style.display='flex';
  console.log('error');
  });



// }

  }
