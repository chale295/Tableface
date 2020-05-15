let sel;
let mode = "Draw";
var buffer = (buffer === undefined) ? undefined : buffer;
let cap;
let input_enabled = true;
var input;

function setup() {
  // Set up canvas
  cv = createCanvas((windowWidth * 0.9), (windowHeight * 0.8));
  centerCanvas();

  // Create a buffer to store board in, if it doesn't already exist.
  if (buffer === undefined)
    {
      buffer = createGraphics((windowWidth * 0.9), (windowHeight * 0.8));
      buffer.background('#ad8762');
    }


  // Load bottle cap image (source: https://favpng.com/png_view/vector-beer-bottle-material-beer-bottle-bottle-cap-png/P6Bw4unX)
  cap = loadImage("/static/cap.png");

// Mode selector
  sel = createSelect();
  sel.position(100, windowHeight - 50);
  sel.style('font-size', '20px')
  sel.option('Draw');
  sel.option('Erase');
  sel.selected('Draw');
  sel.changed(modeSelected);

  // "Flip" button
  button = createButton('FLIP');
  button.style('color', 'white')
  button.style('font-size', '30px');
  button.style('background-color', "#077a26");
  button.position((windowWidth - button.width) / 2, windowHeight - 75);
  button.mousePressed(flip);
  image(buffer, 0 , 0);

  }

function touchMoved() {
    // Draws on the board
    if (mode == "Draw")
    {
      buffer.strokeWeight(3);
      buffer.stroke(0);
      buffer.fill(0);
      buffer.line(mouseX, mouseY, pmouseX, pmouseY);
      image(buffer, 0 , 0);
      return false;
    }

    // "Erases" (actually repainting) parts of board, as dictated by user's mouse movements.
    else if (mode == "Erase")
    {
      buffer.fill('#ad8762');
      buffer.stroke('#ad8762');
      buffer.circle(mouseX, mouseY, 20);
      image(buffer, 0 , 0);
      return false;
    }
}

function modeSelected()
{
  // Change mode
  mode = sel.value();

  // Call touchMoved to enable drawing or erasing (depending on selection)
  touchMoved();
}

// Source: https://medium.com/better-programming/building-a-realtime-drawing-app-using-socket-io-and-p5-js-86f979285b12
function centerCanvas()
{
	const x = (windowWidth - width) / 2;
	const y = (windowHeight - height) / 2;
	cv.position(x, y);
}

// Randomly place bottle cap icon at a point on the board.
function flip()
{
  // Clear canvas and then reload board (gets rid of previous bottle caps)
  clear();
  image(buffer, 0, 0);

  // Generate random coordinates on board
  let randX = random(windowWidth * 0.9);
  let randY = random(windowHeight * 0.9);

  // Adjust bottle cap transparency so that board markings are visible underneath
  push();
  tint(255, 200);
  image(cap, randX, randY, windowWidth / 50, windowHeight / 30);
  pop();
}
