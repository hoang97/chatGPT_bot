// Language
const recogLang = "en-US";
const synthVoice = "Microsoft Zira - English (United States)";
// const recogLang = "vi-VN";
// const synthVoice = "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)";

// Speech
const synth = window.speechSynthesis;

function readBotMessage(msg) {
    const utter = new SpeechSynthesisUtterance(msg);
    for (let voice of synth.getVoices()) {
        if (voice.name === synthVoice) utter.voice = voice;
    }
    synth.speak(utter);
}

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
    readBotMessage(message);
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
    const msg = $('#msg_input').val();
    sendUserMessage(msg);
});
$('#msg_input').on('keyup', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const msg = $('#msg_input').val();
        sendUserMessage(msg);
    }
})

// Get input from user and show it on screen if not empty.
async function sendUserMessage(msg) {
    // Do nothing if input is empty
    if (msg == "") return;

    // Show messages and reset input
    var history = $('#messages').text();
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


// Speech recognition
const recog = new webkitSpeechRecognition();
const micBtn = document.querySelector("#micBtn");
const micErrorInfo = document.querySelector("#mic_error")
recog.continuous = false;
recog.lang = 'en-US';

recog.onstart = () => {
    micBtn.classList.toggle("btn-danger");
    micBtn.classList.toggle("btn-secondary");
    micBtn.classList.toggle("disabled");
    micErrorInfo.classList.remove("show");
}

recog.onerror = () => {
    micBtn.classList.toggle("btn-danger");
    micBtn.classList.toggle("btn-secondary");
    micBtn.classList.toggle("disabled");
    micErrorInfo.classList.add("show");
    console.log('error');
}

recog.onresult = (e) => {
    const ind = e.resultIndex;
    const text = e.results[ind][0].transcript;
    micBtn.classList.toggle("btn-danger");
    micBtn.classList.toggle("btn-secondary");
    micBtn.classList.toggle("disabled");
    console.log(text);
    sendUserMessage(text);
}

micBtn.onclick = (e) => {
    recog.start();
}
