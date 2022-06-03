import { Transform } from 'stream';
import { stdin, stdout } from 'process';

class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const data = chunk.toString();
        const reverseString = data.split('').reverse().join('');

        callback(null, reverseString);
    }
}

export const transform = async () => {
    const reverseStream = new ReverseTransform();

    stdin.pipe(reverseStream).pipe(stdout);
};

transform();
