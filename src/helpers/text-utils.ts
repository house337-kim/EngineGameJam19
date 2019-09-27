import {oneSecond} from './time-utils';

/**
 * Creates a speech bubble that displays for 3 seconds before destroying the object
 * @param scene - the scene to add the speech bubble on
 * @param x - x coordinate to display.
 * @param y - x coordinate to display.
 * @param width - the width of the bubble
 * @param height - the height of the bubble
 * @param quote - What to display inside the bubble
 */
export function createSpeechBubble(scene, x, y, width, height, quote) {

  function destroySpeechBubble() {
    content.destroy();
    bubble.destroy();
  }

  const bubbleWidth = width;
  const bubbleHeight = height;
  const bubblePadding = 10;
  const arrowHeight = bubbleHeight / 4;

  const bubble = scene.add.graphics({x, y});

  //  Bubble shadow
  bubble.fillStyle(0x222222, 0.5);
  bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

  //  Bubble color
  bubble.fillStyle(0xffffff, 1);

  //  Bubble outline line style
  bubble.lineStyle(4, 0x565656, 1);

  //  Bubble shape and outline
  bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

  //  Calculate arrow coordinates
  const point1X = Math.floor(bubbleWidth / 7);
  const point1Y = bubbleHeight;
  const point2X = Math.floor((bubbleWidth / 7) * 2);
  const point2Y = bubbleHeight;
  const point3X = Math.floor(bubbleWidth / 7);
  const point3Y = Math.floor(bubbleHeight + arrowHeight);

  //  Bubble arrow shadow
  bubble.lineStyle(4, 0x222222, 0.5);
  bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

  //  Bubble arrow fill
  bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
  bubble.lineStyle(2, 0x565656, 1);
  bubble.lineBetween(point2X, point2Y, point3X, point3Y);
  bubble.lineBetween(point1X, point1Y, point3X, point3Y);

  const content = scene.add.text(0, 0, quote, {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#000000',
    align: 'center',
    wordWrap: {width: bubbleWidth - (bubblePadding * 2)}
  });

  const b = content.getBounds();

  content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));

  scene.time.delayedCall(oneSecond(), destroySpeechBubble, [], this);

}
