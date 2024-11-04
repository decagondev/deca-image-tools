# deca-image-tools

A lightweight TypeScript library for image processing operations, focusing on edge detection and color manipulation.

## Installation

```bash
npm install deca-image-tools
```

## Features

- Edge detection using Sobel operators
- Image colorization
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

### Colorization

The `colorize` function applies a color tint to an image:

```typescript
import { colorize } from 'deca-image-tools';

// Define your color (RGB values from 0-255)
const color = { r: 255, g: 0, b: 0 }; // Red tint

// Apply colorization
const colorizedImage = colorize(imageData, color);

// Draw the result back to canvas
ctx.putImageData(colorizedImage, 0, 0);
```

## API Reference

### edgeDetect(imageData: ImageData): ImageData

Detects edges in an image using the Sobel operator.

Parameters:
- `imageData`: ImageData object containing the source image

Returns:
- New ImageData object containing the edge-detected image

### colorize(imageData: ImageData, color: { r: number; g: number; b: number }): ImageData

Applies a color tint to an image.

Parameters:
- `imageData`: ImageData object containing the source image
- `color`: Object containing RGB values (0-255) for the tint color

Returns:
- New ImageData object containing the colorized image

## Technical Details

- The edge detection algorithm uses Sobel operators for gradient calculation
- Images are converted to grayscale before edge detection
- All operations create new ImageData objects, leaving the original unchanged
- Alpha channel is preserved in colorization operations

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

- Edge detection is performed on the CPU and may be computationally intensive for large images
- Consider downscaling large images before processing
- All operations are synchronous and will block the main thread

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

### 1.0.0
- Initial release
- Edge detection implementation
- Image colorization support

## Acknowledgments

- This package implements the Sobel edge detection algorithm, a fundamental technique in computer vision and image processing

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.