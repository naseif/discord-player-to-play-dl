# discord-player-to-play-dl
A framework for discord music bots

## the problem
If you have written a discord bot and use discord-player.js for music then you might experience crashes from time to time. 

play-dl is another library for music integration that is more stable. But it comes at a price: you need to refactor your bot so that it can use play-dl. This is work. You do not like work. Especially if it "may not work". So you need a way to switch and test fastly.

## the solution: discord-player-to-play-dl
This library takes the same approach as discord-player.js but uses play-dl in the background to fulfill all your precious requests.

Your refactoring is therfor limited to throwing out discord-player.js and importing discord-player-to-play-dl instead.

Import our library:
```
npm remove discord-player
npm i discord-player-to-play-dl
```

Then change your require statements:

e.g. before:
```
const { Player } = require("discord-player");
const player = new Player(client);
```

after the change:
```
const { Player } = require("discord-player-to-play-dl");
const player = new Player(client);
```

So thats it. Now you use play-dl. 

If something does not work as expected, just change those few lines back and everything is back to normal.

Have fun!
