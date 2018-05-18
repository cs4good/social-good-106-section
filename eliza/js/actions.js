/*
 * Starts by displaying the chat
 */
$(document).ready(function(){
	displayChat();
});
/*
 * Watches for enter key to be pressed
 */
$(document).keypress(function(e) {
	//When the enter key is pressed
	if(e.which == 13) {
		getUserInput();
	}
});

/*
 * Takes the content out of the textbox,
 * error checks, and checks for demos.
 */
function getUserInput(){
	var inputFromUser = $(".send-textbox").val();

	if(inputFromUser == null || inputFromUser != null && inputFromUser.length == 0){
		error("Error: Input cannot be blank");
	}else if(inputFromUser == "run demo1"){
		runDemo1();
		clearSendTextbox();
	}else if(inputFromUser == "run demo2"){
		runDemo2();
		clearSendTextbox();
	}else{
		sendElizaNewMessage(inputFromUser);
	}
}

/*
 * Shows error using notifications
 */
function error(message){
	//console.log(message);
	createNegativeNotification(message, 9);
}

/* displayChat() is called whenever a new message has been sent (meaning we need to)
 * update the chat interface to reflect the new message.
 *
 * Refreshes the HTML based on the chatHistory array, which is a list
 * of chat messages sent between the User and Eliza.
 */
function displayChat(){
	//console.log("displayChat");
	
	/* This function programmatically generates HTML based on chatHistory array.
	 * After going through all the messages in chatHistory and generating that html, we
	 * insert that HTML into the #chat-area div (in index.html)
	 */
	var html = '';

	// If no chat history exists, that means we just opened the screen. Start Eliza!
	if(chatHistory.length == 0){
		startElizaChat();		// in eliza.js
	}else{
		// Otherwise, we need to load each message. For each message in chatHistory...
		for(var i = 0;i < chatHistory.length;i++){

			// get that message
			var currentMessage = chatHistory[i];

			// and then format the HTML based on whether that message is from Eliza or User
			if(currentMessage.isEliza){
				html += getElizaMessageHTML(currentMessage.content);
			}else{
				html += getUserMessageHTML(currentMessage.content);
			}
		}

		$("#chat-area").html(html);
		$('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
	}
	$('#body').scrollTop($('#body')[0].scrollHeight);
	//console.log($('#body')[0].scrollHeight);
}

/*
 * Returns proper HTML for formatting a message from Eliza into #chat-area
 */
function getElizaMessageHTML(message){
	return '<div class="chat-message-outter-wrapper"><img src="./assets/imgs/guy.png" class="chat-message-icon"><div class="chat-message-wrapper eliza-message"><p class="chat-message-text text-left">' + message + '</p><p class="chat-user-text">Eliza</p></div></div>';
}
/*
 * Returns proper HTML for formatting a message from user into #chat-area
 */
function getUserMessageHTML(message){
	return '<div class="chat-message-outter-wrapper text-right"><div class="chat-message-wrapper you-message"><p class="chat-message-text text-left">' + message + '</p><p class="chat-user-text">You</p></div><img src="./assets/imgs/laptop.png" class="chat-message-icon"></div>';
}
/*
 * Empty user send textbox
 */
function clearSendTextbox(){
	$(".send-textbox").val('');
}