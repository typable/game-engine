# game-engine
A lightweight JavaScript Game Engine
<br>
<br>

## Example
<br>

```javascript
import GameEngine from '...';

const {Game, Surface, Shape} = GameEngine;
```
<br>

```javascript
class Entity extends Surface {

    constructor(x, y) {
        super(x, y, new Shape.Rect(60, 60));
    }
    
    update() {
        // ...
    }
    
    render(g) {
        const {x, y, shape} = this;
        g.fillRect(x, y, shape.width, shape.height);
    }
    
}
```
<br>

```javascript
class ExampleGame extends Game {

    constructor() {
        super(window.innerWidth, window.innerHeight);
        this.bindEvent(window, 'resize');
        this.entity = new Entity(100, 100);
    }
    
    onresize() {
        this.resize(window.innerWidth, window.innerHeight);
    }
    
    update() {
        this.entity.update();
    }
    
    render(g) {
        super.render(g);
        this.entity.render(g);
    }
    
}

const game = new ExampleGame();
game.start();

document.body.appendChild(game.canvas);
```
