const socket=io('http://localhost:8000');

const head=document.getElementById('stay1');
const body=document.getElementById('stay2');
const mess_form=document.getElementById('stay3');
const head1=document.getElementById('r1');
const form1=document.getElementById('r2');
const user=document.getElementById('uname');
const rid=document.getElementById('rid');
const messageContainer=document.querySelector('.login');

const append=(message, position) =>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

form1.addEventListener('submit', (e) =>{
    e.preventDefault();
    if((user.value==null || user.value=='') && (rid.value==null || rid.value==''))
    {
        alert("User Name and RoomID cannot be null");
    }
    else if(user.value.length<6)
    {
        alert("User Name length cannot be less than 6");
    }
    else if(rid.value.length<6)
    {
        alert("RoomID length cannot be less than 6");
    }
    else if(/\D/.test(rid.value))
    {
        alert("RoomID can only contain numbers");
    }
    else
    {
        const name=[user.value, rid.value];

        const messageElement1=document.createElement('h2');
        const messageElement2=document.createElement('input');
        const messageElement3=document.createElement('button');
        
        messageElement2.setAttribute('type', 'text');
        messageElement2.setAttribute('id', 'message');
        messageElement2.setAttribute('name', 'message');

        messageElement3.setAttribute('id', 'send');
        messageElement3.innerText='Send';
        
        head1.remove();
        form1.remove();
        
        messageElement1.innerText='Room_ID: '+name[1];
        head.append(messageElement1);
        
        mess_form.append(messageElement2);
        mess_form.append(messageElement3);
        socket.emit('new-user-joined', name);
    }
});

mess_form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const messageInp=document.getElementById('message');
    const message=messageInp.value;
    append('you: '+message, 'right');
    socket.emit('send', message);
    messageInp.value=blank; 
});

socket.on('user-joined', name =>{
    append(name+' joined the chat', 'left');
});

socket.on('receive', data =>{
    append(data.by+': '+data.messages, 'left');
});