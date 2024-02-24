export type Image32Bit = {
    width: number;
    height: number;
    pixels: {
        r: number;
        g: number;
        b: number;
    }[];
};

export const RawImageToImage = (buf: Buffer): Image32Bit => {
    const ret: Image32Bit = {
        width: 80,
        height: 50,
        pixels: [],
    };

    // Images are 5 bits per color, such that:
    // r r r r r g g g | g g b b b b b *
    // IMAGE.RAW files are 8000 bytes, two bytes per pixel
    // Image dimensions are 80w * 50h * 2 bytes = 8000 bytes

    for (let i = 0; i < buf.byteLength; i += 2) {
        const byte = buf.readUInt16LE(i);
        const r = (((byte >> 0xA) & 0b11111) / (0b11111)) * 255;
        const g = (((byte >> 0x5) & 0b11111) / (0b11111)) * 255;
        const b = (((byte >> 0x0) & 0b11111) / (0b11111)) * 255;

        ret.pixels.push({r, g, b});
    }

    return ret;
};