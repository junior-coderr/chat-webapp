let fname = document.querySelector('.fname');
let lname=document.querySelector('.lname');
let email=document.querySelector('.email');
let password=document.querySelector('.password');
let loaderContainer =document.querySelector('.loader-container');
let actual_msg =document.querySelector('.actual_msg');
let username_inp =document.querySelector('.username-inp');
let user_msg =document.querySelector('.user-msg');
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

function close_username(){
  pop_close('.username-container');
  loaderContainer.style.display='none';
}







function usernameCheck(){
  loaderContainer.style.display='flex';
  // pop_close('.lds-ellipsis');
  // pop_close('.username-container');

  

  let data={
    fname:fname.value,
    lname:lname.value,
    email:email.value.toLowerCase(),
    password:password.value,
    username:username_inp.value,
  }

  const usernameUniqueTest = new Promise((resolve, reject) => {

  
  fetch('https://chat-8953.onrender.com/username',{
    method: 'POST',
    headers:{
      'Content-Type':'application/JSON'
    },
    body:JSON.stringify({username:data.username}),
  }).then((res)=>{return res.json()})
  .then((res)=>{
    if(res.isThere){
      reject();
      console.log('p')
    }else{
      resolve();
      console.log('r')
    }
  });

  });


  usernameUniqueTest.then(function (){

console.log('username');

  fetch('https://chat-8953.onrender.com/signup',{
    method: 'POST',
    headers:{
      'Content-Type':'application/JSON'
    },
    body:JSON.stringify(data),
  })
  .then((response) => response.json())
  .then(res=>{
    
    console.log('res');
    if(res.status){
      window.location.href = res.next;
      pop_close('.lds-ellipsis');
      loaderContainer.style.display='none';
      console.log('going good')
    }else{
      console.log('res.err');
      pop_close('.username-container');
      pop_close('.msg');
      pop_close('.lds-ellipsis');
      
      actual_msg.innerText=res.err;
      loaderContainer.style.display='flex';
      console.log('error -2');
    }
  })
  .catch((error) => {
    pop_close('.lds-ellipsis');
    pop_close('.msg');
    
    actual_msg.innerText='Something went wrong';
    loaderContainer.style.display='flex';
    console.log('error in');
  });

}).catch(function () {
  console.log('usernamedss');

  user_msg.innerText='This username is already taken!';

});


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



  if(!validator.isEmpty(data.fname,{ignore_whitespace: true})&&!validator.isEmpty(data.lname,{ignore_whitespace: true})&&!validator.isEmpty(data.password,{ignore_whitespace: true})){
    if(validator.isEmail(data.email)){


      // pop_close('.username-container');



    fetch('https://chat-8953.onrender.com/email',{
      method: 'POST',
      headers:{
        'Content-Type':'application/JSON'
      },
      body:JSON.stringify({email:data.email}),
    }).then((res)=>{return res.json()})
    .then((data)=>{

      console.log(data);

      if(data.isThere){
        pop_close('.lds-ellipsis');
        pop_close('.msg');
        actual_msg.innerText='This email is already used!';
        loaderContainer.style.display='flex';
        console.log('error -1');
      }else{
        pop_close('.lds-ellipsis');
        pop_close('.username-container');
        loaderContainer.style.display='flex';
        console.log('going good')
      }

    });



  // userNameComing.then(function (){
    
    
    // fetch('http://localhost:3000/signup',{
    //   method: 'POST',
    //   headers:{
    //     'Content-Type':'application/JSON'
    //   },
    //   body:JSON.stringify(data),
    // })
    // .then((response) => response.json())
    // .then(res=>{
      
    //   console.log('res');
    //   if(res.status){
    //     window.location.href = res.next;
    //     pop_close('.lds-ellipsis');
    //     loaderContainer.style.display='none';
    //     console.log('going good')
    //   }else{
    //     console.log('res.err');
    //     pop_close('.msg');
    //     pop_close('.lds-ellipsis');
        
    //     actual_msg.innerText=res.err;
    //     loaderContainer.style.display='flex';
    //     console.log('error -2');
    //   }
    // })
    // .catch((error) => {
    //   pop_close('.lds-ellipsis');
    //   pop_close('.msg');
      
    //   actual_msg.innerText='Something went wrong';
    //   loaderContainer.style.display='flex';
    //   console.log('error in');
    // });
    
    
  // });




}else{
  pop_close('.lds-ellipsis');
  pop_close('.msg');

  actual_msg.innerText='please enter the valid email address!';
  loaderContainer.style.display='flex';
  console.log('error');
}

}else{
pop_close('.lds-ellipsis');
pop_close('.msg');

actual_msg.innerText='Please fill out all the fields properly!';
loaderContainer.style.display='flex';
console.log('error');
}

  }
  