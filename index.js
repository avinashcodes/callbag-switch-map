const switchMap = (makeSource, combineResults) => inputSource => (start, outputSink) => {
	if(start !== 0) return;
	if(!combineResults) combineResults = (x, y) => y;
	let currSourceTalkback = null;
	let sourceEnded = false;

	inputSource(0, (t,d) => {
		if(t === 0) outputSink(t, d);
		if(t === 1){
			if(currSourceTalkback){
				currSourceTalkback(2);
				currSourceTalkback = null;
			}

			let currSource = makeSource(d);

			currSource(0, (currT, currD) => {
				if(currT === 0) currSourceTalkback = currD;
				if(currT === 1) outputSink(t, combineResults(d, currD));
				if(currT === 0 || currT === 1) currSourceTalkback && currSourceTalkback(1);
				if(currT === 2){
					currSourceTalkback = null;
					if(sourceEnded) outputSink(currT, currD);
				}
			});
		}
		if(t === 2){
			sourceEnded = true;
			if(!currSourceTalkback) outputSink(t, d);
		}

	});
}

module.exports = switchMap;
