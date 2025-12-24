import { screen } from "../src/screen";

// Example 1: Using the fluent API for pixel comparison
console.log("Example 1: Fluent API for color comparison");
const pixel = screen.getPixel(100, 100);

if (pixel) {
  console.log(`Pixel at (100, 100): RGB(${pixel.r}, ${pixel.g}, ${pixel.b})`);
  console.log(`Hex color: ${pixel.toHex()}`);
  console.log(`Numeric value: 0x${pixel.toNumber().toString(16).toUpperCase()}`);
  console.log();

  // Check if the pixel is exactly red
  if (pixel.isEqual({ r: 255, g: 0, b: 0 })) {
    console.log("✓ Pixel is exactly red!");
  } else {
    console.log("✗ Pixel is not exactly red");
  }

  // Check if the pixel is approximately red (with tolerance)
  if (pixel.isSimilar({ r: 255, g: 0, b: 0 }, 30)) {
    console.log("✓ Pixel is approximately red (within 30 tolerance)");
  } else {
    console.log("✗ Pixel is not approximately red");
  }
}

console.log("\n" + "=".repeat(50) + "\n");

// Example 2: Checking multiple pixels
console.log("Example 2: Checking multiple specific pixels");
const positions = [
  { x: 0, y: 0 },
  { x: 100, y: 100 },
  { x: 500, y: 500 },
];

positions.forEach((pos) => {
  const p = screen.getPixel(pos.x, pos.y);
  if (p) {
    console.log(`${p.toString()} - ${p.toHex()}`);
  }
});

console.log("\n" + "=".repeat(50) + "\n");

// Example 3: Finding a specific color on screen
console.log("Example 3: Searching for white pixels");
const whitePixel = screen.pixelSearch(
  0,
  0,
  200,
  200,
  { r: 255, g: 255, b: 255 },
  10 // tolerance
);

if (whitePixel) {
  const found = screen.getPixel(whitePixel.x, whitePixel.y);
  console.log(`✓ Found white pixel at (${whitePixel.x}, ${whitePixel.y})`);
  console.log(`  Actual color: ${found?.toHex()}`);
} else {
  console.log("✗ No white pixel found in region (0,0) to (200,200)");
}

console.log("\n" + "=".repeat(50) + "\n");

// Example 4: Direct property access
console.log("Example 4: Direct RGB property access");
const p = screen.getPixel(250, 250);
if (p) {
  // You can access r, g, b properties directly
  if (p.r > 200 && p.g < 50 && p.b < 50) {
    console.log("Pixel is predominantly red");
  } else if (p.g > 200 && p.r < 50 && p.b < 50) {
    console.log("Pixel is predominantly green");
  } else if (p.b > 200 && p.r < 50 && p.g < 50) {
    console.log("Pixel is predominantly blue");
  } else {
    console.log(
      `Pixel has mixed colors: R=${p.r}, G=${p.g}, B=${p.b}`
    );
  }
}
