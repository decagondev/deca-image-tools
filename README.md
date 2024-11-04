# deca-image-tools

A lightweight TypeScript library for image processing operations, offering a variety of filters and transformations including edge detection, blur effects, and color manipulation.

## Installation

```bash
npm install deca-image-tools
```

## Features

- Edge detection using Sobel operators
- Gaussian blur filter
- Image sharpening
- Brightness adjustment
- Image colorization
- Color inversion
- TypeScript support out of the box
- Zero dependencies
- Fully typed API

## Usage

### Edge Detection

The `edgeDetect` function applies Sobel edge detection to an image, converting it to grayscale and highlighting edges:

```typescript
import { edgeDetect } from 'deca-image-tools';

// Assuming you have an ImageData object from a canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Apply edge detection
const edgedImage = edgeDetect(imageData);

// Draw the result back to canvas
ctx.putImageData(edgedImage, 0, 0);
```

### Gaussian Blur

The `gaussianBlur` function applies a Gaussian blur effect to smooth the image:

```typescript
import { gaussianBlur } from 'deca-image-tools';

// Apply Gaussian blur with default radius
const blurredImage = gaussianBlur(imageData);

// Or specify a custom radius
const customBlurredImage = gaussianBlur(imageData, 2);
```

### Color Manipulation

The library provides several color manipulation functions:

```typescript
import { colorize, invertColors, adjustBrightness } from 'deca-image-tools';

// Apply a red tint
const color = { r: 255, g: 0, b: 0 };
const colorizedImage = colorize(imageData, color);

// Invert colors
const invertedImage = invertColors(imageData);

// Adjust brightness (factor > 1 brightens, < 1 darkens)
const brightenedImage = adjustBrightness(imageData, 1.5);
```

## API Reference

### edgeDetect(imageData: ImageData): ImageData

Detects edges in an image using the Sobel operator.

Parameters:
- `imageData`: ImageData object containing the source image

Returns:
- New ImageData object containing the edge-detected image

### gaussianBlur(imageData: ImageData, radius?: number): ImageData

Applies a Gaussian blur effect to the image.

Parameters:
- `imageData`: ImageData object containing the source image
- `radius`: Optional blur radius (default: 1)

Returns:
- New ImageData object containing the blurred image

### sharpen(imageData: ImageData): ImageData

Applies a sharpening filter to the image.

Parameters:
- `imageData`: ImageData object containing the source image

Returns:
- New ImageData object containing the sharpened image

### adjustBrightness(imageData: ImageData, factor: number): ImageData

Adjusts the brightness of an image.

Parameters:
- `imageData`: ImageData object containing the source image
- `factor`: Brightness adjustment factor (>1 brightens, <1 darkens)

Returns:
- New ImageData object with adjusted brightness

### colorize(imageData: ImageData, color: { r: number; g: number; b: number }): ImageData

Applies a color tint to an image.

Parameters:
- `imageData`: ImageData object containing the source image
- `color`: Object containing RGB values (0-255) for the tint color

Returns:
- New ImageData object containing the colorized image

### invertColors(imageData: ImageData): ImageData

Inverts the colors of an image.

Parameters:
- `imageData`: ImageData object containing the source image

Returns:
- New ImageData object with inverted colors

## Technical Details

- The edge detection algorithm uses Sobel operators for gradient calculation
- Gaussian blur uses a 3x3 kernel with customizable radius
- Sharpening uses a 3x3 kernel matrix
- All operations create new ImageData objects, leaving the original unchanged
- Alpha channel is preserved in color manipulation operations

## Project Structure

```
deca-image-tools/
├── src/
│   └── index.ts          # Main source code
├── dist/                 # Compiled output
│   ├── index.js
│   └── index.d.ts
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Documentation
```

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deca-image-tools.git
cd deca-image-tools
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

- `npm run build` - Compiles the TypeScript code
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint for code quality
- `npm run format` - Formats code using Prettier

## Requirements

- Modern browser with Canvas API support
- TypeScript 4.0+ (for TypeScript users)
- Node.js 14+ (for development)

## Browser Support

The package supports all modern browsers that implement the Canvas API:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Performance Considerations

- Image processing operations are performed on the CPU and may be computationally intensive for large images
- Consider downscaling large images before processing
- All operations are synchronous and will block the main thread
- The Gaussian blur operation may be particularly intensive on large images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Update tests as appropriate
- Follow the existing code style
- Update documentation for any new features

## License

MIT

## Author

Tom Tarpey (decagondev)

## Changelog

### 1.0.1
- Gaussian blur filter
- Image sharpening
- Brightness adjustment
- Color inversion support

### 1.0.0
- Initial release
- Edge detection implementation
- Image colorization

## Acknowledgments

- This package implements several fundamental image processing algorithms including the Sobel edge detection algorithm and Gaussian blur

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.