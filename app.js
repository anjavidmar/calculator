console.log('hello world, go on calculate something!');
var h = window.innerHeight;
var w = window.innerWidth;

var app = new Vue({
    el: '#calculator',
    data: {
        caculation: '',
        screen: 0,
        screenStatus: 0,
        x: '',
        wholeNumber: true,
        operator: '',
        y: '',
        z: 0,
    },
    methods: {
        clearScreen: function(n){
            this.caculation = '';
            this.screen = 0;
            this.screenStatus = 0;
            this.x = '';
            this.wholeNumber = true;
            this.operator = '';
            this.y = '';
            this.z = 0;
        },
        setNumber: function(n){
            if (this.screenStatus === 0) {
                this.screen = n;
                this.caculation = n;
                this.screenStatus = 1;
            } else if (this.screenStatus === 2) {
                this.screen = n;
                this.caculation += n;
                this.screenStatus = 1;
            } else if (this.screenStatus === 3) {
                this.screen = n;
                this.caculation = n;
                this.screenStatus = 1;
            } else {
                this.screen += n;
                this.caculation += n;
            }
        },
        setOperator: function(i){
            var o = [' + ', ' − ', ' × ', ' ÷ '];
            if (this.screenStatus < 2) {
                if (this.caculation === '') {
                    this.caculation = '0' + o[i];
                    this.screenStatus = 2;
                    this.x = 0;
                    this.operator = o[i];
                } else if (this.operator === '') {
                    this.caculation += o[i];
                    this.screenStatus = 2;
                    if (this.wholeNumber) {
                        this.x = parseInt(this.screen);
                    } else {
                        this.x = parseFloat(this.screen);
                    }
                    this.screen = 0;
                    this.wholeNumber = true;
                    this.operator = o[i];
                } else if (this.operator === o[0]) {
                    if (this.wholeNumber) {
                        this.y = parseInt(this.screen);
                    } else {
                        this.y = parseFloat(this.screen);
                    }
                    this.z = this.x + this.y;
                    this.caculation = this.z.toString() + o[i];
                    this.screen = 0;
                    this.screenStatus = 2;
                    this.x = this.z;
                    this.wholeNumber = true;
                    this.operator = o[i];
                    this.y = '';
                } else if (this.operator === o[1]) {
                    if (this.wholeNumber) {
                        this.y = parseInt(this.screen);
                    } else {
                        this.y = parseFloat(this.screen);
                    }
                    this.z = this.x - this.y;
                    this.caculation = this.z.toString() + o[i];
                    this.screen = 0;
                    this.screenStatus = 2;
                    this.x = this.z;
                    this.wholeNumber = true;
                    this.operator = o[i];
                    this.y = '';
                } else if (this.operator === o[2]) {
                    if (this.wholeNumber) {
                        this.y = parseInt(this.screen);
                    } else {
                        this.y = parseFloat(this.screen);
                    }
                    this.z = this.x * this.y;
                    this.caculation = this.z.toString() + o[i];
                    this.screen = 0;
                    this.screenStatus = 2;
                    this.x = this.z;
                    this.wholeNumber = true;
                    this.operator = o[i];
                    this.y = '';
                } else if (this.operator === o[3]) {
                    if (this.wholeNumber) {
                        this.y = parseInt(this.screen);
                    } else {
                        this.y = parseFloat(this.screen);
                    }
                    this.z = this.x / this.y;
                    this.caculation = this.z.toString() + o[i];
                    this.screen = 0;
                    this.screenStatus = 2;
                    this.x = this.z;
                    this.wholeNumber = true;
                    this.operator = o[i];
                    this.y = '';
                }
            } else if (this.screenStatus === 3) {
                this.caculation = this.x.toString() + o[i];
                this.screenStatus = 2;
                this.screen = 0;
                this.wholeNumber = true;
                this.operator = o[i];
            }
        },
        setZero: function(){
            if (this.screenStatus === 0 || this.screenStatus === 3) {
                this.screen = '0';
                this.caculation = '0';
                this.screenStatus = 1;
            } else if (this.screenStatus === 2) {
                this.screen = '0';
                this.caculation += '0';
                this.screenStatus = 1;
            } else  {
                this.screen += '0';
                this.caculation += '0';
            }
        },
        setDecimalPoint: function(n){
            if (this.wholeNumber) {
                if (this.screen === 0) {
                    this.screen = '0.';
                    this.screenStatus = 1;
                    this.caculation += '0.';
                    this.wholeNumber = false;
                } else {
                    this.screen += n;
                    this.screenStatus = 1;
                    this.caculation += n;
                    this.wholeNumber = false;
                }
            }
        },
        equals: function(n){
            if (this.wholeNumber) {
                this.y = parseInt(this.screen);
            } else {
                this.y = parseFloat(this.screen);
            }
            if (this.operator === ' + ') {
                this.z = this.x + this.y;
            } else if (this.operator === ' − ') {
                this.z = this.x - this.y;
            } else if (this.operator === ' × ') {
                this.z = this.x * this.y;
            } else if (this.operator === ' ÷ ') {
                this.z = this.x / this.y;
            }
            this.caculation += ' = ';
            this.screen = this.z;
            this.screenStatus = 3;
            this.x = this.z;
            this.wholeNumber = true;
            this.operator = '';
            this.y = '';
            this.z = 0;
        },
    }
})

function screenSize(){
    var screenHeightInfo = 'screen height = ' + h;
    var screenWidthInfo = 'screen width = ' + w;
    console.log(screenHeightInfo, screenWidthInfo);
    document.getElementById('screen-size').innerHTML = screenHeightInfo + '<br />' + screenWidthInfo;
}

screenSize()