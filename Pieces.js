class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }

    getPos() {
        return this.xpos+this.ypos;
    }

    getY() {
        return this.ypos;
    }
    getX() {
        return this.xpos;
    }

    setY(ypos) {
        this.ypos = ypos;
    }

    setX(xpos) {
        this.xpos = xpos;
    }

    setPos(Position) {
        this.xpos = Position.getX();
        this.ypos = Position.getY();
    }
}

class Team {
    constructor(team) {
        this.team = team;
    }

    getTeam() {
        return this.team;
    }
}

function isVacant(Position) {//checks if the given position has a piece on it returns true if there isn't a piece
    return true;
}
function moveXpos(xPos, toTheRight) {
    var x = xPos.toUpperCase();
    if(toTheRight){
        switch (x){
            case "A":
                return "B";
            case "B":
                return "C";
            case "C":
                return "D";
            case "D":
                return "E";
            case "E":
                return "F";
            case "F":
                return "G";
            case "G":
                return "H";
            case "H":
                return null;
        }
    } else {
        switch (x){
            case "A":
                return null;
            case "B":
                return "A";
            case "C":
                return "B";
            case "D":
                return "C";
            case "E":
                return "D";
            case "F":
                return "E";
            case "G":
                return "F";
            case "H":
                return "G";
        }
    }

    return true;
}

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
    possiblemoves(){
        var dictPossibleMoves = {};

        if(this.team === "White"){
            // White pawn
            let oneMoveForward = this.position.yGet + 1;
            //first move
            if(this.position.yGet = 2){
                if(isVacant(new Position(this.position.xGet, oneMoveForward))===null) {
                    dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward));
                    if(isVacant(new Position(this.position.xGet, oneMoveForward + 1)===null)){
                        dictPossibleMoves.add(dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward + 1)));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.xGet, oneMoveForward))===null) {
                dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward))
            }
            //Attack move
            let toRight = moveXpos(this.position.xGet, true);
            let toLeft =  moveXpos(this.position.xGet, false);
            if(toRight !== null) {
                if(isVacant(new Position(toRight, oneMoveForward)).team === "Black"){
                    dictPossibleMoves.add(new Position(toRight, oneMoveForward));
                }
            }
            if(toLeft !== null) {
                if(isVacant(new Position(toLeft, oneMoveForward).team === "Black")){
                    dictPossibleMoves.add(new Position(toLeft, oneMoveForward));
                }
            }

            return dictPossibleMoves

        } else {

            // Black pawn

            let oneMoveForward = this.position.yGet - 1;
            //first move
            if(this.position.yGet = 2){
                if(isVacant(new Position(this.position.xGet, oneMoveForward))) {
                    dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward));
                    if(isVacant(new Position(this.position.xGet, oneMoveForward + 1))){
                        dictPossibleMoves.add(dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward + 1)));
                    }
                }
            } else
            //One move forward
            if(isVacant(new Position(this.position.xGet, oneMoveForward))) {
                dictPossibleMoves.add(new Position(this.position.xGet, oneMoveForward))
            }
            //Attack move
            let toRight = moveXpos(this.position.xGet, true);
            let toLeft =  moveXpos(this.position.xGet, false);
            if(toRight !== null) {
                if(isVacant(new Position(toRight, oneMoveForward)).team === "White"){
                    dictPossibleMoves.add(new Position(toRight, oneMoveForward));
                }
            }
            if(toLeft !== null) {
                if(isVacant(new Position(toLeft, oneMoveForward)).team === "White"){
                    dictPossibleMoves.add(new Position(toLeft, oneMoveForward));
                }
            }
        }
        return dictPossibleMoves;
    }

    upgrade() {
        return new Queen(new Position(this.position.getX(), this.position.getY()), new Team(this.team.getTeam()));
    }

    checkUpgrade() {
        if (this.team === "White" && this.position.getY == 8) {
            this.upgrade();
        } else if (this.team === "Black" && this.position.getY == 1) {
            this.upgrade();
        }
    }

        upgrade() {
            new Queen(this.position.getPosition, this.team.getTeam);
        }
}

function movesLeftRight(dict, piece, toTheRight){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while(True){
        xPos = moveXpos(xPos, toTheRight);
        if (xPos != null){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.add(newPos);
        } else if (isVacant(newPos).getTeam()!== piece.getTeam()){
            dict.add(newPos);
            break;
        }
    }
}

function movesUpDown(dict, piece, direction){
    var xPos = piece.position.getX();
    var yPos = piece.position.getY();
    while (True){
        yPos = yPos + direction;
        if (yPos > 8 || yPos < 1){
            break;
        }
        var newPos = new Position(xPos, yPos);
        if (isVacant(newPos) == null){
            dict.add(newPos);
        } else if (isVacant(newPos).getTeam()!== piece.getTeam()){
            dict.add(newPos);
            break;
        }
    }
}

class Rook {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }

    possiblemoves(){
        var dict = {};
        var xPos = this.position.getX();
        var yPos = this.position.getY();
        // Right
        movesLeftRight(dict, this, true);
         // Left
        movesLeftRight(dict,this, false);
        // Up
        movesUpDown(dict, this, 1);
        // Down
        movesUpDown(dict, this, -1);
    }
}

class Knight {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Bishop {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
}

class Queen {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
        addToMap(this, Position);
    }
    possiblemoves(){
        var dict = {;
        var xPos = this.position.getX();
        var yPos = this.position.getY();
        // Right
        movesLeftRight(dict, this, true);
        // Left
        movesLeftRight(dict,this, false);
        // Up
        movesUpDown(dict, this, 1);
        // Down
        movesUpDown(dict, this, -1);
        //right up
        crossmoves(dict, this, 1, true);
        //left up
        crossmoves(dict, this, 1, false);
        //right down
        crossmoves(dict, this, -1, true);
        //left down
        crossmoves(dict, this, -1, false);
    }
    }
}

class King {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }
    possiblemoves() {
        var dict = {};

    }
}