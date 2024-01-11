# React Face Snake
Play the famous game Snake in a whole new way, with the position of your face.

The game can be found [here](https://face-snake.netlify.app/).

This version of Snake was inspired by [the game made by Paruby](https://github.com/paruby/snake-face)

## About the project
The game makes use of the Tiny Face Detector model of [face-api.js](https://github.com/justadudewhohacks/face-api.js) (which is built on top of [TensorFlow.js](https://github.com/tensorflow/tfjs)) to detect the position of your face in the webcam. This will move the snake left/right/up/down.

Unlike the actual Snake game, touching the snake itself again does not end the game since otherwise the game would be too hard with the way it is controlled.

## Built With
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [Face-api.js](https://github.com/justadudewhohacks/face-api.js)

## Roadmap
- [x] Modernize the project from its initial state
- [x] Host the site on Netlify
- [ ] Use TensorFlow.js directly instead of face-api.js
- [ ] Add mobile support (if possible)