import Game from './game.js';
import Group from './group.js';
import Surface from './surface.js';
import Shape from './shape.js';
import Sprite from './sprite/sprite.js';
import Spritesheet from './sprite/spritesheet.js';

import * as Collision from './util/collision.js';
import Animation from './util/animation.js';
import * as Canvas from './util/canvas.js';
import Timer from './util/timer.js';
import Bitmap from './util/bitmap.js';

const GameEngine = {
	Game,
	Group,
	Surface,
	Shape,
	Sprite,
	Spritesheet,
	instance: null
};

export const Util = {
	Collision,
	Animation,
	Canvas,
	Timer,
	Bitmap
};

export default GameEngine;