const email = document.querySelector('.email');
const password = document.querySelector('.password');
let loaderContainer =document.querySelector('.loader-container');
let actual_msg =document.querySelector('.actual_msg');


function pop_close(elem_class){
    let elem=document.querySelector(elem_class);
    elem.classList.toggle('hidden');
    console.log('pop_close')
  }
  
  function close_msg(){
    pop_close('.msg');
    loaderContainer.style.display='none';
  }


function login(event){
    event.preventDefault();


    loaderContainer.style.display='flex';
    pop_close('.lds-ellipsis');

    if(validator.isEmail(email.value)){
        
    fetch('https://chat-4g1b.onrender.com//login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value.toLowerCase(),
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.status){
            loaderContainer.style.display='none';
            pop_close('.lds-ellipsis');
            window.location.href = data.next;

            email.blur();
            password.blur();
            
        }else{
            pop_close('.lds-ellipsis');
            loaderContainer.style.display='flex';
            pop_close('.msg');
            actual_msg.innerText=data.err
        }
    })

    }else{
        pop_close('.lds-ellipsis');
        loaderContainer.style.display='flex';
        pop_close('.msg');
        actual_msg.innerText="please enter a valid email address";
    }

}