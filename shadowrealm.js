const IntrinsicsGlobalNames = [
    // *** 18.1 Value Properties of the Global Object
    'Infinity',
    'NaN',
    'undefined',

    // *** 18.2 Function Properties of the Global Object
    'eval', // dangerous
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',

    // *** 18.3 Constructor Properties of the Global Object
    'AggregateError',
    'Array',
    'ArrayBuffer',
    'Boolean',
    'DataView',
    'Date', // Unstable & Remapped
    'Error', // Unstable
    'EvalError',
    'Float32Array',
    'Float64Array',
    'Function', // dangerous
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Map', // Remapped
    'Number',
    'Object',
    // Allow Blue `Promise` constructor to overwrite the Red one so that promises
    // created by the `Promise` constructor or APIs like `fetch` will work.
    'Promise', // Remapped
    'Proxy', // Unstable
    'RangeError',
    'ReferenceError',
    'RegExp', // Unstable
    'Set', // Remapped
    'SharedArrayBuffer',
    'String',
    'Symbol',
    'SyntaxError',
    'TypeError',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'URIError',
    'WeakMap', // Remapped
    'WeakSet', // Remapped

    // *** 18.4 Other Properties of the Global Object
    'Atomics',
    'JSON',
    'Math',
    'Reflect',

    // *** Annex B
    'escape',
    'unescape',

    'Intl',
];

window.suite = {
    add(name, callback) {
        setTimeout(() => {
            const t0 = performance.now();
            callback();
            callback();
            callback();
            const t1 = performance.now();
            console.log(`${name}: ${t1 - t0} milliseconds.`);
        }, 0)

        return suite;
    }
};

suite
    .add('realm dummy polyfill', () => {
        var shadow = new ShadowRealm();
        var removeIntrinsics = shadow.evaluate(`
            (names) => {
                var realmGlobal = globalThis;
                var IntrinsicsGlobalNames = names.split(',');
                var descriptors = Object.getOwnPropertyDescriptors(realmGlobal);
        
                Object.keys(descriptors).forEach((name) => {
                    // No check for configurable, everything is configurable
                    // Skip global intrinsics
                    if (!IntrinsicsGlobalNames.includes(name)) {
                        delete realmGlobal[name];
                    }
                });
            }
        `);

        removeIntrinsics(IntrinsicsGlobalNames.join(','));
        
        shadow.evaluate('typeof x;');
    });

describe('1', () => it('works', () => { expect(true).toBe(true); }));