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
let back_button =document.querySelector('.back-button');
let chat_msg_container =document.querySelector('.chat-msg-container');

let connection;
let current_user = document.querySelector('.head-name').dataset.username;
let all_users=[];
let callback=null;
console.log(current_user);      



let focused_user={};

function chat_room_name_gen(current_user,chat_user) {

    let chat_room_name = current_user + chat_user;
    let chat_room_name_reverse = chat_user + current_user;

    if(chat_room_name > chat_room_name_reverse){
        return chat_room_name_reverse;
    }else{
        return chat_room_name;
    }
}


function chat_message_maker(msg,type){

    const chat_msg_parent = document.createElement('div');
    const chat_msg_span = document.createElement('span');

    chat_msg_parent.style.display = 'flex';

    if(type=='sent'){
        chat_msg_parent.style.justifyContent = 'flex-end';
        chat_msg_span.classList.add('recievers-msg');
    }else{
        chat_msg_parent.style.justifyContent = 'flex-start';
        chat_msg_span.classList.add('senders-msg');
    }

    chat_msg_span.innerText=msg;
        
    document.querySelector('.chat-msg-container').appendChild(chat_msg_parent);
    chat_msg_parent.appendChild(chat_msg_span);
        
}





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
    if(from=='none'){

        // document.querySelector(from).classList.toggle('oc-page-anim');
        document.querySelector(to).classList.toggle('oc-page-anim');
    }else if(to=='none'){
        document.querySelector(from).classList.toggle('oc-page-anim');
        // document.querySelector(to).classList.toggle('oc-page-anim');
    }else {
        document.querySelector(from).classList.toggle('oc-page-anim');
        document.querySelector(to).classList.toggle('oc-page-anim');
    }
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
            // name.innerText = data.firstname + ' ' + data.lastname;


            name.innerText=data.firstname + ' ' + data.lastname;
            name.dataset.name = data.firstname + ' ' + data.lastname;
                username.dataset.username=data.username;



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
        username:username.dataset.username,
    }
    let cut_name = name.dataset.name.split(' ');
    // updating back arrow name 
    n.innerText=cut_name[0]+' '+cut_name[1].slice(0,1);
    // updating back arrow name 



    back_button.removeEventListener('click',callback);

    callback=()=>{
        // console.log('a')
        virtual_oc_page('.user-container','.search-container');
    }
    back_button.addEventListener('click',callback);
    
});




function chat_person_maker(name,username){

    const chat_p = document.createElement('div');
    const icon = document.createElement('i');
    const g_div = document.createElement('div');
    const  c_name = document.createElement('h3');
    const c_username = document.createElement('p');

    chat_p.dataset.name=name;
    chat_p.dataset.username=username;


    const chat_list = document.querySelector('.chat-people-list');

    chat_p.classList.add('chat-person');

    chat_p.addEventListener('click',added_list_chat_opener);

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
        all_users=data.data;
        if(data.data.length > 0){
            all_users=data.data;
            document.querySelector('.chat-load').style.display='none';
            document.querySelector('.no-chat-msg').style.display='none';

            document.querySelector('.chat-people-list').style.display='flex';

            data.data.forEach((chat)=>{
                chat_person_maker(chat.name, chat.username);
            })


        callback=()=>{
            virtual_oc_page('.user-container','none');
            loaderContainer.style.display='none';
            virtual_page_section.classList.toggle('hidden');
            // console.log('b')
            }
        
            back_button.addEventListener('click',callback);



        }else{
            document.querySelector('.chat-load').style.display='none';
            document.querySelector('.no-chat-msg').style.display='block';
        }
    })
})()






async function added_list_chat_opener(){
    loaderContainer.style.display='flex';
    virtual_page_section.classList.toggle('hidden');

    virtual_oc_page('none','.user-container');

    // data update 
    focused_user={
        current_user,
        name:this.dataset.name,
        username:this.dataset.username,
    }
    // data update 



    // updating back arrow name 
    let cut_name =focused_user.name.split(' ');
    // updating back arrow name 
    n.innerText=cut_name[0]+' '+cut_name[1].slice(0,1);
    // updating back arrow name 


    connection= await io('http://localhost:3000',{
        reconnectionDelay: 3000
    });

    document.querySelector('.add-btn').style.display='none';
    // console.log(focused_user);
    back_button.removeEventListener('click',callback);

    let room_name = chat_room_name_gen(focused_user.current_user,focused_user.username);


    connection.emit('user_connected',room_name,focused_user);



    connection.on('recieve-msg',(msg)=>{
        console.log(msg)
        chat_message_maker(msg,'recieved');
        chat_msg_container.scrollTop = chat_msg_container.scrollHeight;


    })



    callback=()=>{
        virtual_oc_page('.user-container','none');
        loaderContainer.style.display='none';
        virtual_page_section.classList.toggle('hidden');
        document.querySelector('.add-btn').style.display='flex';


        connection.disconnect();
    // console.log('c')
        }
    

        back_button.addEventListener('click',callback);
        


        
}




async function add_user_to_list(){
    // let chat_input = document.querySelector('.chat-input');

    console.log("user:",focused_user)


    // if(!validator.isEmpty(chat_input.value,{ignore_whitespace:true})){
        console.log('Please enter');



        // const socket = await io('http://localhost:3000',{
        //     reconnectionDelay: 3000
        // });

        


        // console.log('pa:',all_users.length);
        
        if(!all_users.some((user) =>  user.username === focused_user.username) ){
            chat_person_maker(focused_user.name,focused_user.username);
            all_users.push(focused_user);

            connection= await io('http://localhost:3000',{
                reconnectionDelay: 3000
            });

            connection.emit('add_user_to_userlist',focused_user);
            console.log(focused_user);
            console.log('not there!!')

            if(all_users.length==1){
                document.querySelector('.chat-load').style.display='none';
            document.querySelector('.no-chat-msg').style.display='none';
            console.log('please select')
            document.querySelector('.chat-people-list').style.display='flex';
            }

        }
      

    // }
}



async function send_msg(){

    let chat_input = document.querySelector('.chat-input');

    if(!validator.isEmpty(chat_input.value,{ignore_whitespace:true})){
        // console.log('Please enter');

        let room_name = chat_room_name_gen(focused_user.current_user,focused_user.username);


        
        connection.emit('send_msg',room_name,chat_input.value);

        chat_message_maker(chat_input.value,'sent')
        chat_msg_container.scrollTop = chat_msg_container.scrollHeight;

        chat_input.value='';
        console.log('chat sent')






    }
    
}

document.querySelector('.send-btn').addEventListener('click',send_msg);