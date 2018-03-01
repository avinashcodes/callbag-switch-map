const switchMap = (makeSource, combineResults) => inputSource => (start, outputSink) => {
	if(start !== 0) return;
	if(!combineResults) combineResults = (x, y) => y;
	let currSourceTalkback = null;

	const unsubscribeCurrSource = function(){
		if(currSourceTalkback){
			currSourceTalkback(2);
		}
	};
	
	inputSource(0, (t,d) => {
		if(t === 1){
			unsubscribeCurrSource();
			
			let currSource = makeSource(d);

			currSource(0, (currT, currD) => {
				if(currT === 0) currSourceTalkback = currD;
				if(currT === 1) outputSink(t, combineResults(d, currD));
				if(currT === 0 || currT === 1) currSourceTalkback(1);
			});
		} else {
			if(t === 2){
				unsubscribeCurrSource();
			}
			outputSink(t, d);
		}
	});
}

module.exports = switchMap;