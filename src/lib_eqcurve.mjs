// -*- coding: utf-8, tab-width: 2 -*-

import flatMap from './flatmap';


function numFmt(x) { return x.toFixed(8).replace(/\.?0*$/, ''); }

function pointLine(pt) {
  const { freq, gain } = pt;
  return `  <point f="${numFmt(freq)}" d="${numFmt(gain)}" />`;
}

function verifyAscending(list, key) {
  function check(prev, curr, idx) {
    const x = (key ? curr[key] : curr);
    if (!Number.isFinite(x)) {
      throw new TypeError(`Expected a finite number at index ${
        idx}, not ${typeof x} "${x}"`);
    }
    if (!idx) { return x; }
    if (prev < x) { return x; }
    throw new RangeError(`Expected ${prev} < ${x} at index ${idx}`);
  }
  list.reduce(check, null);
  return list;
}

function pointsToXml(curve) {
  const name = (curve.name || `unnamed@${Date.now()}`);
  const censored = String(name).replace(/[\x00-\x1F"'<>]+/g, '¿');
  // ^-- if you want fancy names, xmldefuse() them yourself.
  const points = (curve.points || curve);
  verifyAscending(points, 'freq');
  const lines = [
    `<equalizationeffect><curve name="${censored}">`,
    ...points.map(pointLine),
    '</curve></equalizationeffect>',
  ];
  return lines;
}


function symmetricEnvelope(midFreq, shape) {
  if (midFreq.map) {
    return flatMap(midFreq, f => symmetricEnvelope(f, shape));
  }
  const low = [];
  const high = [];
  shape.forEach(({ dist, gain }) => {
    if (dist) { low.push({ freq: midFreq - dist, gain }); }
    high.push({ freq: midFreq + dist, gain });
  });
  return low.reverse().concat(high);
}


function simpleMountain(peakFreq, peakGain, halfWidth) {
  return symmetricEnvelope(peakFreq, [
    { dist: 0, gain: peakGain },
    { dist: halfWidth, gain: 0 },
  ]);
}


export default {
  numFmt,
  pointLine,
  pointsToXml,
  simpleMountain,
  symmetricEnvelope,
};
