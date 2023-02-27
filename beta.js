const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

//definiowanie postaci gracza
class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 80     
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        
    }
    
}
//definiowanie robaka
class Worm{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 40
        this.height = 40
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
}
//definiowanie skały
class Rock{
    constructor({x,y}){
        this.position = {
            x,
            y
        }
        this.width = 50
        this.height = 50
    }
    draw(){
        c.fillStyle = 'grey'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

let player = new Player();
let worms = [new Worm({x: 750, y: 550}), new Worm({x: 400, y:200})]
let rocks = [new Rock({x: 800, y: 300 }), new Rock({x: 540, y: 210})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

function init(){
    player = new Player()
    worms = [new Worm({x: 750, y: 550}), new Worm({x: 400, y:200})]
    woods = [new Rock({x: 800, y: 300 }), new Rock({x: 540, y: 210})]

}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    worms.forEach(worm =>{
        worm.draw()
    })
    rocks.forEach(rock =>{
        rock.draw()
    })

    if(keys.right.pressed){
        player.velocity.x = 5
    }else if(keys.left.pressed) {
        player.velocity.x = -5
    }else player.velocity.x = 0
    
    if(keys.up.pressed) {
        player.velocity.y = -5
    }else if(keys.down.pressed) {
        player.velocity.y = 5
    }else player.velocity.y = 0; 

    rocks.forEach(rock => {
        if(touchUpperBorder(player, rock)){
            player.velocity.y = 0
        }else if(touchBottomBorder(player, rock)){
            player.velocity.y = 0
        }else if(touchFlankBorder(player, rock)){
            player.velocity.x = 0
        }
    })

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
       case 65:
           keys.left.pressed = true
           break

       case 83:
           keys.down.pressed = true
           break

       case 68:
           keys.right.pressed = true
           break
           
       case 87:
           keys.up.pressed = true
           break
    }
});

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
       case 65:
           keys.left.pressed = false
           break

       case 83:
           keys.down.pressed = false
           break

       case 68:
           keys.right.pressed = false
           break
           
       case 87:
           keys.up.pressed = false
           break
    }
});
}
//funkcja zderzenia
function touchUpperBorder(a, b) {
    if (a.position.y + a.height <= b.position.y && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x + a.width >= b.position.x && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touchBottomBorder(a, b) {
    if (a.position.y + a.height >= b.position.y && a.position.y + a.velocity.y + 10 <= b.position.y + b.height && a.position.x + a.width >= b.position.x && a.position.y + a.height + a.velocity.y >= b.position.y && a.position.x <= b.position.x + b.width) {
        return true;
    }
    return false;
}
function touchFlankBorder(a, b) {
    if (((a.position.x + a.width <= b.position.x && a.position.x + a.width + a.velocity.x >= b.position.x) || (a.position.x >= b.position.x + b.height && a.position.x + a.velocity.x + 10 <= b.position.x + b.height)) && a.position.y <= b.position.y + b.height && a.position.y + a.height >= b.position.y) {
        return true;
    }
    return false;
}
animate()