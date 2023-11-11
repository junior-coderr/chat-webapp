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

let current_user = document.querySelector('.head-name').dataset.email;
console.log(current_user);      



let focused_user={};


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
            name.dataset.username=data.username;


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
    focused_user={
        current_user,
        name:name.dataset.name,
        username:name.dataset.username,
    }
    
    n.innerText=name.dataset.name;
    
});

function chat_person_maker(name,username){

    const chat_p = document.createElement('div');
    const icon = document.createElement('i');
    const g_div = document.createElement('div');
    const  c_name = document.createElement('h3');
    const c_username = document.createElement('p');

    const chat_list = document.querySelector('.chat-people-list');

    chat_p.classList.add('chat-person');
    icon.classList.add('bi');
    icon.classList.add('bi-person-fill');
    icon.classList.add('chat-i');
    c_name.classList.add('chat-name');
    c_username.classList.add('chat-username');

    chat_list.appendChild(chat_p);
    chat_p.appendChild(icon);
    chat_p.appendChild(g_div);
    g_div.appendChild(c_name);
    g_div.appendChild(c_username);

    c_name.innerText=name;
    c_username.innerText=username;
    console.log(name)
    console.log(username)
}





(function get_all_the_chats(){
    fetch('http://localhost:3000/chats/get',{
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify({current_user})
    }).then((response)=> response.json())
    .then((data)=>{
        console.log(data.data);
        if(data.data.length > 0){
            document.querySelector('.chat-load').style.display='none';
            document.querySelector('.no-chat-msg').style.display='none';

            document.querySelector('.chat-people-list').style.display='flex';

            data.data.forEach((chat)=>{
                chat_person_maker(chat.name, chat.username);
            })

        }else{
            document.querySelector('.chat-load').style.display='none';
            document.querySelector('.no-chat-msg').style.display='block';
        }
    })
})()

async function add_user_to_list(){
    const socket = await io('http://localhost:3000',{
    reconnectionDelay: 3000
});
socket.emit('add_user_to_userlist',focused_user);
}
