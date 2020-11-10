var suite = new Benchmark.Suite(
	'iframes', {
		onComplete() {
			console.log('Fastest is ' + this.filter('fastest').map('name'));
			Object.keys(this[0]);
		}
	});

suite
	.add('iframes, appended to document', () => {
		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
	})
	.add('iframes detached', () => {
		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		var iframeWindow = iframe.contentWindow;
		document.body.removeChild(iframe);
	})
	.add('iframes as sandboxes', () => {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
		iframe.style.display = 'none';

		document.body.appendChild(iframe);
		var iframeWindow = iframe.contentWindow;
		document.body.removeChild(iframe);
	})
	.add('virtualization setup, removing non-unforgeables', () => {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
		iframe.style.display = 'none';

		document.body.appendChild(iframe);
		var iframeWindow = iframe.contentWindow;
		document.body.removeChild(iframe);

		var descriptors = Object.getOwnPropertyDescriptors(iframeWindow);

		var unforgeables = Object.entries(descriptors).filter(([name, desc]) => {
			const configurable = desc.configurable;
			
			if (configurable) {
				delete iframeWindow[desc.name];
			}

			return !configurable;
		}).map(([name]) => name);
    
    	// console.log(unforgeables);
	})
	.run();
