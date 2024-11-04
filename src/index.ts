export function edgeDetect(imageData: ImageData): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);

    const gx = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    const gy = [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = 0;
            let pixelY = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const r = imageData.data[idx];
                    const g = imageData.data[idx + 1];
                    const b = imageData.data[idx + 2];
                    const gray = (r + g + b) / 3;

                    pixelX += gx[ky + 1][kx + 1] * gray;
                    pixelY += gy[ky + 1][kx + 1] * gray;
                }
            }

            const magnitude = Math.min(255, Math.max(0, Math.sqrt(pixelX * pixelX + pixelY * pixelY)));
            const outputIdx = (y * width + x) * 4;

            output.data[outputIdx] = magnitude;
            output.data[outputIdx + 1] = magnitude;
            output.data[outputIdx + 2] = magnitude;
            output.data[outputIdx + 3] = 255;
        }
    }

    return output;
}

export function gaussianBlur(imageData: ImageData, radius: number = 1): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);

    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];
    const kernelWeight = 16;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const weight = kernel[ky + 1][kx + 1];

                    r += imageData.data[idx] * weight;
                    g += imageData.data[idx + 1] * weight;
                    b += imageData.data[idx + 2] * weight;
                }
            }

            const outputIdx = (y * width + x) * 4;
            output.data[outputIdx] = r / kernelWeight;
            output.data[outputIdx + 1] = g / kernelWeight;
            output.data[outputIdx + 2] = b / kernelWeight;
            output.data[outputIdx + 3] = 255;
        }
    }

    return output;
}

export function sharpen(imageData: ImageData): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);

    const kernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const weight = kernel[ky + 1][kx + 1];

                    r += imageData.data[idx] * weight;
                    g += imageData.data[idx + 1] * weight;
                    b += imageData.data[idx + 2] * weight;
                }
            }

            const outputIdx = (y * width + x) * 4;
            output.data[outputIdx] = Math.min(255, Math.max(0, r));
            output.data[outputIdx + 1] = Math.min(255, Math.max(0, g));
            output.data[outputIdx + 2] = Math.min(255, Math.max(0, b));
            output.data[outputIdx + 3] = 255;
        }
    }

    return output;
}


export function adjustBrightness(imageData: ImageData, factor: number): ImageData {
    const output = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        output.data[i] = Math.min(255, imageData.data[i] * factor);
        output.data[i + 1] = Math.min(255, imageData.data[i + 1] * factor);
        output.data[i + 2] = Math.min(255, imageData.data[i + 2] * factor);
        output.data[i + 3] = imageData.data[i + 3];
    }

    return output;
}


export function colorize(imageData: ImageData, color: { r: number; g: number; b: number }): ImageData {
    const output = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const alpha = imageData.data[i + 3];
        output.data[i] = (imageData.data[i] * color.r) / 255;
        output.data[i + 1] = (imageData.data[i + 1] * color.g) / 255;
        output.data[i + 2] = (imageData.data[i + 2] * color.b) / 255;
        output.data[i + 3] = alpha;
    }

    return output;
}

export function invertColors(imageData: ImageData): ImageData {
    const output = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        output.data[i] = 255 - imageData.data[i];
        output.data[i + 1] = 255 - imageData.data[i + 1];
        output.data[i + 2] = 255 - imageData.data[i + 2];
        output.data[i + 3] = imageData.data[i + 3];
    }

    return output;
}


export function rotateImage(imageData: ImageData, degrees: number): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const angle = (degrees * Math.PI) / 180;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const output = new ImageData(width, height);
    const centerX = width / 2;
    const centerY = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const srcX = Math.floor(centerX + dx * cosA - dy * sinA);
            const srcY = Math.floor(centerY + dx * sinA + dy * cosA);

            if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
                const srcIdx = (srcY * width + srcX) * 4;
                const destIdx = (y * width + x) * 4;

                output.data[destIdx] = imageData.data[srcIdx];
                output.data[destIdx + 1] = imageData.data[srcIdx + 1];
                output.data[destIdx + 2] = imageData.data[srcIdx + 2];
                output.data[destIdx + 3] = imageData.data[srcIdx + 3];
            }
        }
    }

    return output;
}

export function skewImage(imageData: ImageData, skewX: number, skewY: number): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const skewedX = Math.floor(x + skewY * y);
            const skewedY = Math.floor(y + skewX * x);

            if (skewedX >= 0 && skewedX < width && skewedY >= 0 && skewedY < height) {
                const srcIdx = (y * width + x) * 4;
                const destIdx = (skewedY * width + skewedX) * 4;

                output.data[destIdx] = imageData.data[srcIdx];
                output.data[destIdx + 1] = imageData.data[srcIdx + 1];
                output.data[destIdx + 2] = imageData.data[srcIdx + 2];
                output.data[destIdx + 3] = imageData.data[srcIdx + 3];
            }
        }
    }

    return output;
}


