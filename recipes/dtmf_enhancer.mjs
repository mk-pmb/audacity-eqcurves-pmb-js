#!/usr/bin/env nodemjs
// -*- coding: utf-8, tab-width: 2 -*-

import dtmfFacts from '../facts/dtmf';
import flatMap from '../src/flatmap';
import eqCurve from '../src/lib_eqcurve';

const curve = { name: 'DTMF enhancer' };

const halfEnvelope = [
  { dist: 0,    gain: 24 },
  { dist: 2,    gain: 20 },
  { dist: 2.5,  gain: 0 },
];
const fullEnvelope = [
  ...halfEnvelope.slice(1).reverse().map(h => ({ ...h, gain: -h.gain })),
  ...halfEnvelope,
];

function renderPoint(baseFreq, pt) {
  const { dist, gain } = pt;
  return { freq: baseFreq + dist, gain };
}
curve.points = flatMap(dtmfFacts.freqs,
  baseFreq => flatMap(fullEnvelope,
    pt => renderPoint(baseFreq, pt)));
curve.xml = [...eqCurve.pointsToXml(curve), ''].join('\n');

function cliMain() { this.process.stdout.write(curve.xml); }
curve.nodemjsCliMain = cliMain;


export default curve;
