/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

/**
 * Get input from user and show it on screen on button click or Enter pressed
 */
$('#send_button').on('click', (e) => {
    sendUserMessage();
});
$('#msg_input').on('keyup', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendUserMessage();
    }
})

// Get input from user and show it on screen if not empty.
async function sendUserMessage() {
    const msg = $('#msg_input').val();

    // Do nothing if input is empty
    if (msg == "") return;

    // Show messages and reset input
    var history = $('#messages').text();
    console.log(history);
    $('#msg_input').val('');
    showUserMessage(msg);
    history += 'User: ' + msg + '\n';
    const botReply = await getBotMessage(history);
    console.log(botReply);
    history += 'Sally: ' + botReply.answer.choices[0].text + '\n';
    showBotMessage(botReply.answer.choices[0].text);
    $('#messages').text(history);
}

// Get bot reply
async function getBotMessage(input) {
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'q='+input
    })
    return response.json()
}

/**
 * Set initial bot message to the screen for the user.
 */
$(window).on('load', function () {
	showBotMessage('Hello there! I am here for help');
});
