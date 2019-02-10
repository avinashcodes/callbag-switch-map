import flatten from 'callbag-flatten'
import map from 'callbag-map'

const switchMap = project => source => flatten(map(project)(source));

export default switchMap;
