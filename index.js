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
    .add('iframes detached', () => {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
    })
    .add('iframe eval', () => {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';

        document.body.appendChild(iframe);
        var realmGlobal = iframe.contentWindow;

        var realmEvaluate = realmGlobal.eval;
        document.body.removeChild(iframe);

        realmEvaluate('typeof x;');
    })
    .add('realm dummy polyfill', () => {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        iframe.style.display = 'none';

        document.body.appendChild(iframe);
        var realmGlobal = iframe.contentWindow;
        
        var descriptors = Object.getOwnPropertyDescriptors(realmGlobal);
        
        Object.entries(descriptors).forEach(([name, desc]) => {
            const configurable = desc.configurable;
            if (configurable) {
                // Skip global intrinsics
                if (!IntrinsicsGlobalNames.includes(name)) {
                    delete realmGlobal[name];
                }
            }
        });

        Object.setPrototypeOf(realmGlobal.document, null);

        var windowProto = realmGlobal.__proto__;

        var windowProtoDescs = Object.getOwnPropertyDescriptors(windowProto);
        Object.entries(windowProtoDescs).forEach(([name, desc]) => {
            const configurable = desc.configurable;
            if (configurable) {
                delete windowProto[name];
            }
        });

        var windowProperties = realmGlobal.__proto__.__proto__;

        var windowPropertiesDescs = Object.getOwnPropertyDescriptors(windowProperties);
        Object.entries(windowPropertiesDescs).forEach(([name, desc]) => {
            const configurable = desc.configurable;
            if (configurable) {
                delete windowProperties[name];
            }
        });

        var eventTargetProto = realmGlobal.__proto__.__proto__.__proto__;

        var eventTargetProtoDescs = Object.getOwnPropertyDescriptors(eventTargetProto);
        Object.entries(eventTargetProtoDescs).forEach(([name, desc]) => {
            const configurable = desc.configurable;
            if (configurable) {
                delete eventTargetProto[name];
            }
        });

        var realmEvaluate = realmGlobal.eval;
        document.body.removeChild(iframe);
        realmEvaluate('typeof x;');
    });