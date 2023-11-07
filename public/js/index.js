let loaderContainer =document.querySelector('.loader-container');
let virtual_page_section =document.querySelector('.virtual-page-section');
let actual_msg =document.querySelector('.actual_msg');
let username_search_inp =document.querySelector('.username_search_inp');
let user =document.querySelector('.user');
let username =document.querySelector('.username');
let name =document.querySelector('.name');
let dynamic_custom_message =document.querySelector('.dynamic-custom-message');
let no_user_found =document.querySelector('.no-user-found');
let n =document.querySelector('.n');


function logout(){
  pop_close('.lds-ellipsis');
  loaderContainer.style.display='flex';
  
fetch('http://localhost:3000/logout',{
    headers: {
        'Content-Type': 'application/json'
    },
    method:'POST',
    body:JSON.stringify({})
}).then((response)=> response.json())
.then((data)=>{
    if(data.status){

        window.location.href = data.next;
        pop_close('.lds-ellipsis');
        loaderContainer.style.display='none';
        console.log(data);
    }else{
        pop_close('.msg');
        actual_msg.innerText = "Something went wrong!";
        loaderContainer.style.display='flex';
    }
})
.catch((err)=>{
    pop_close('.lds-ellipsis');

    pop_close('.msg');
    actual_msg.innerText = "Something went wrong!";
    loaderContainer.style.display='flex';
})

}



function pop_close(elem_class){
    let elem=document.querySelector(elem_class);
    elem.classList.toggle('hidden');
    console.log('pop_close')
  }

  function close_msg(){
    pop_close('.msg');
    loaderContainer.style.display='none';
  }



function oc_page(element,oc){
    document.querySelector(element).classList.toggle('oc-page-anim');

    if(oc=='close'){
        
        // setTimeout(()=>{
            loaderContainer.style.display='none';
            virtual_page_section.classList.toggle('hidden');
        // },200);
    }else{

    // if(oc=='close'){
    //     // setTimeout(()=>{
    //         virtual_page_section.classList.toggle('hidden');
    //     // },0);

    // }else{
        
        loaderContainer.style.display='flex';
        virtual_page_section.classList.toggle('hidden');
        
        // }

    }
}

function virtual_oc_page(from,to,){
    document.querySelector(from).classList.toggle('oc-page-anim');
    document.querySelector(to).classList.toggle('oc-page-anim');
}



function search_user(){


    if(!validator.isEmpty(username_search_inp.value,{ignore_whitespace: true})){

    dynamic_custom_message.style.display='flex';


    fetch('http://localhost:3000/user/search',{
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify({username:username_search_inp.value})
    }).then((response)=> response.json())
    
    .then((data)=>{
        
        if(data.status == 'success'){
    dynamic_custom_message.style.display='none';
            
            console.log(data)
            user.style.display = 'flex';
            name.innerText = data.firstname + ' ' + data.lastname;
            
            name.dataset.name=data.firstname + ' ' + data.lastname.slice(0,1);

            username.innerText = data.username;
            no_user_found.style.display = 'none';

        }else if(data.status == 'failed'){

    user.style.display = 'none';
    dynamic_custom_message.style.display='none';
    no_user_found.innerText = 'No user found';
    no_user_found.style.display = 'block';

            console.log('failed')

        }else{

    user.style.display = 'none';
    dynamic_custom_message.style.display='none';
    no_user_found.style.display = 'block';
    no_user_found.innerText = 'Something went wrong!';

            console.log('Something went wrong');
        }
    })



}
}



user.addEventListener('click',()=>{
    
    n.innerText=name.dataset.name;
    
    });