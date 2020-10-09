# Conway's Game of Life Simulator



This reference application implements the ([wikipedia: Conway Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)) simulation.

Glenn Inn, Oct 2020



## Requirements:

This application is written in Javascript and requires node to be installed.  I don't think that there is a hard dependency on Node-version.



## To Run Application

To launch this application with a default initial gameboard, use the following syntax:

`node life.js`

This gitlab includes some sample initial gameboards that lend to unique patterns.

| Filename        | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| gosper.json     | Implements the Gosper Gun oscillator                         |
| oscillator.json | Implements 2 of the basic 2-period oscillators: *blinker* and *toad* |
| pulsar.json     | Implements a more complex (and pretty) 3-period  *pulsar* oscillator |

You may launch the application with a specific initial gameboard.  For example, to see the pulsar oscillation, you would use the following syntax:

`node life.js pulsar.json`

## Contributing Gameboards

Feel free to create initial gameboards and send to glenninn@yahoo.com or issue a pull request.

