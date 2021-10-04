const eventSource = new EventSource(`http://localhost:8080/sender/test01/receiver/test02`);

eventSource.onmessage = (e) => {
    console.log("e: ", e);
    const data = JSON.parse(e.data);
    console.log("data: ", data);
}


function getSendMsgBox(msg) {
	return `<div class="sent_msg">
	<p>${msg}</p>
	<span class="time_date"></span>
</div>`;
}

function addMsg(msg){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg")

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing-msg"

    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value);
    chatBox.append(chatOutgoingBox)
    msgInput.value="";
}

document.querySelector("#chat-outgoing-button").addEventListener("click",()=>{
    // alert("click")
    addMsg();

});
document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e)=>{
    // alert("key")
    // console.log(e.keyCode);
    if(e.keyCode === 13){
        // alert("enter")
        addMsg();
    }
});