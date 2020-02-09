vm = new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        gameLog: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameLog = [];
        },
        surrender: function() {
            this.game = false;
        },
        action: function(playerAction){
            this.playerDo(playerAction);
            this.monsterDo();
            this.checkEndState();
        },
        playerDo: function(x){
            val = '';
            switch(x){
                case 'attack':
                    val = getRandom(3,7);
                    this.monsterHealth -= val;
                    break;
                case 'special-attack':
                    val = getRandom(1,16);
                    this.monsterHealth -= val;
                    break;
                case 'heal':
                    val = getRandom(5,9);
                    this.playerHealth += val;
                    if (this.playerHealth > 100){
                        this.playerHealth = 100;
                    }
                    break;
                case 'surrender':
                    this.gameIsRunning = false;
            }
            this.logger("Player", x, val);
        },
        monsterDo: function(){
            val = getRandom(4,8);
            this.playerHealth -= val;
            this.logger("Monster", "attack", val);
        },
        checkEndState: function(){
            if(this.monsterHealth < 0 && this.playerHealth < 0) {
                alert("Tie game!");
                this.gameIsRunning = false;
            } else if (this.monsterHealth < 0){
                alert("Player wins!");
                this.gameIsRunning = false;
            } else if (this.playerHealth < 0){
                alert("Monster wins!");
                this.gameIsRunning = false;
            }
        },
        logger: function(character, action, value){
            this.gameLog.unshift({"player": character, "action": action, "value": value})
        }

    }
  });

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  