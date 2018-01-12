var board;
var init = function () {
    var cfg = {
        draggable: true,
        dropOffBoard: 'snapback', // this is the default
        position: 'start',
        onDrop: onDrop
    };
    board = ChessBoard('board', cfg);
    board.on
};
$(document).ready(init);


var onDrop = function (newLocation, oldLocation, source, spiece, position, orientation) {
    if (oldLocation === newLocation) return;
    sendMove(oldLocation, newLocation);
    return 'snapback';
};

function updateTimer(timeLeft) {
    document.getElementById("time").innerHTML = timeLeft + " seconds";
}

var ws = new WebSocket('ws://' + window.location.hostname + ':5000', 'echo-protocol');

function sendMove(oldLoc, newLoc) {
    var message = JSON.stringify({action: "move", oldLocation: newLoc, newLocation: oldLoc});
    ws.send(message);
}

function isValidMessage(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

function showalert(message, alerttype="alert-warning") {
    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' +  alerttype + '"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
        $("#alertdiv").remove();
    }, 5000);
}



function handleServerMessage(event) {
    var message = JSON.parse(event.data);

    if (message.action === "move") {
        requestBoard(); // To enable castling, en peasent and promotion
    } else if (message.action === "newBoard") {
        console.log(JSON.parse(message.board))
        board.position(JSON.parse(message.board));
    } else if (message.action === "timeLeft") {
        updateTimer(message.time);
    } else if (message.action === "error") {
        showalert(message.message, "alert-warning");
    } else if (message.action === "currentSide") {
        document.getElementById("currentSide").innerHTML = message.currentSide;
    } else if (message.action === "movesList") {
        document.getElementById("movesList").innerHTML = "";
        var parsedMoves = JSON.parse(message.moves);
        for (var move in parsedMoves) {
            if (parsedMoves.hasOwnProperty(move)) {
                document.getElementById("movesList").innerHTML += "<p>" + parsedMoves[move].key + ": " + parsedMoves[move].value + " votes </p>";
            }
        }
    } else if (message.action === "color") {
        document.getElementById("color").innerHTML = "Your color is " + message.color;
    }
}

function requestTime() {
    ws.send(JSON.stringify({action: "timeLeft"}));
}

function requestCurrentSide() {
    ws.send(JSON.stringify({action: "currentSide"}));
}

function requestBoard() {
    ws.send(JSON.stringify({action: "newBoard"}));
}

ws.onopen = function (event) {
    requestTime();
    requestCurrentSide();
    requestBoard();
};

ws.addEventListener("message", function (e) {
    handleServerMessage(e);
});