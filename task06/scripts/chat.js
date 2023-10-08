const form = document.querySelector('form');
const submit = document.querySelector('input[type="submit"]');
const username = document.querySelector('input[type="text"]');
const message = document.querySelector('textarea');
const chat = document.querySelector('.chat-messages');
const clear = document.querySelector('#clear');

// When Refreshing data to 0
username.value = '';
message.value = '';

// Add new messages to the chat
form.addEventListener('submit', (e) => {

    e.preventDefault();

    // 1. Get the values from the form
    let usernameValue = username.value.trim();
    let messageValue = message.value.trim();

    // 2. Check if the values are not empty
    if (usernameValue === '' || messageValue === '') {
        alert('Please fill in all fields');
        return;
    }

    // 3. Create an object with the values
    let chatMessage = {
        username: usernameValue,
        message: messageValue
    }

    // 4. Send the object to the server
    fetch(`./server/addNewMessage.php?name=${usernameValue}&message=${messageValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            // 5. If the response is successful, clear the form
            if (data.status === 'success') {
                message.value = '';
            } else {
                alert('Something went wrong');
            }
        })
});

// Get all messages from the server (Refresh the chat every 4 seconds)
setInterval(() => {
    console.log('Refresh the chat');
    fetch('./server/getDiscussion.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            // 1. Clear the chat
            chat.innerHTML = '';

            if (data.status === 'error') {
                // add the error message to the chat
                chat.innerHTML = data.message;
                return;
            }

            data = data.data;

            // 2. Add all messages to the chat
            data.forEach(message => {
                // 2. Add all messages to the chat
                chat.innerHTML += `
                    <div class="message">
                        <div class="message-header">
                            <span class="message-username">${message.name}</span>
                            <span class="message-timestamp">${formatDate(message.timestamp)}</span>
                        </div>
                        <div class="message-body">
                            <p class="message-text text-left">${message.message}</p>
                        </div>
                    </div>
                `;
            });
        });
}, 4000);

// clear the chat
clear.addEventListener('click', () => {
    fetch('./server/clearDiscussion.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                chat.innerHTML = '';
            } else {
                chat.innerHTML = '';
            }
        });
});

const formatDate = (date) => {
    // 1. Create a new Date object
    const newDate = new Date(date);

    // 2. Get the day, month and year
    const day = newDate.getDate();

    // 3. Get the month
    let month = newDate.getMonth() + 1;

    // 4. Get the year
    const year = newDate.getFullYear();

    // 5. Get the hours, minutes and seconds
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    // 6. Format the date
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

}