new Vue({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: []

    },

    methods: {
        startGame: function(){
            this.isGameRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        },

        attack: function () {
            var damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hit Monster' + damage
            });
            if( this.checkWin()) {
                return;
            }
            this.monsterAttack();


        },

        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(20, 10);
            if( this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },

        monsterAttack: function () {
            var damage = this.calculateDamage(12,5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hit Player' + damage
            });
            console.log(this.turns)
            this.checkWin();
        },

        heal: function () {
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack()
        },
        giveUp: function () {
            this.isGameRunning = false;
        },

        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        checkWin: function () {
            if(this.monsterHealth <= 0){
                if(confirm('You won! New game?')){
                    this.startGame()
                } else {
                    this.isGameRunning = false
                }
                return true;
            } else if(this.playerHealth <= 0) {
                if( confirm('You lost! New game?')){
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }

            return false;

        }
    }


});