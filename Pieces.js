class Position {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
    get getPosition() {
        return this.xpos+this.ypos;
    }
}

class Team {
    constructor(team) {
        this.team = team;
    }
}

class Pawn {
    constructor(Position, Team){
        this.team = Team;
        this.position = Position;
    }

}

var a = new Pawn(new Position("a","2"), new Team("White"));