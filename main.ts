
function create_message(reciever: number, kind: number, contents: string) {
    _message = "" + reciever + "|" + kind + "|" + contents
    return _message
}
 function get_message_contents (message: string) {
    for (let _k = 0; _k <= message.length - 1; _k++) {
        if (message.charAt(_k) == "|") {
            _delimeters_found2 += 1
            if (_delimeters_found2 == 2) {
                return message.substr(_k + 1, message.length - _k)
            } else {
                _last_delimeter_index = _k
            }
        }
    }
    return ""
}
function get_message_kind (message: string) {
    for (let _j = 0; _j <= message.length - 1; _j++) {
        if (message.charAt(_j) == "|") {
            _delimeters_found += 1
            if (_delimeters_found == 2) {
                return parseInt(message.substr(_last_delimeter_index + 1, _j))
            } else {
                _last_delimeter_index = _j
            }
        }
    }
    return -1
}
function get_message_reciever(message: string) {
    for (let _i = 0; _i <= message.length - 1; _i++) {
        if (message.charAt(_i) == "|") {
            return parseInt(message.substr(0, _i))
        }
    }
    return -1
}
radio.onReceivedString(function (msg) {
    // Dealer receives join requests while finding players
    let _reciever = get_message_reciever(msg)
    if(_reciever == serial_number){
        if(role == ROLE_DEALER){
            msg_recieved_dealer(
            radio.receivedPacket(RadioPacketProperty.SerialNumber), 
            get_message_kind(msg),
            get_message_contents(msg),
            )
        }
        else{
                msg_recieved_player(
                    radio.receivedPacket(RadioPacketProperty.SerialNumber),
                    get_message_kind(msg),
                    get_message_contents(msg),
                )
            
        }
    }
})

function msg_recieved_dealer(sender: number, msg_kind: number, msg_contents: string){
    
}
function msg_recieved_player(sender: number, msg_kind: number, msg_contents: string){

}


