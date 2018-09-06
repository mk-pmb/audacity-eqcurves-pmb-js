// -*- coding: utf-8, tab-width: 2 -*-

function numFmt(x) { return x.toFixed(8).replace(/\.?0*$/, ''); }

function pointLine(pt) {
  const { freq, gain } = pt;
  return `  <point f="${numFmt(freq)}" d="${numFmt(gain)}" />`;
}

function pointsToXml(curve) {
  const name = (curve.name || `unnamed@${Date.now()}`);
  const censored = String(name).replace(/[\x00-\x1F"'<>]+/g, '¿');
  // ^-- if you want fancy names, xmldefuse() them yourself.
  const lines = [
    `<equalizationeffect><curve name="${censored}">`,
    ...(curve.points || curve).map(pointLine),
    '</curve></equalizationeffect>',
  ];
  return lines;
}


export default {
  numFmt,
  pointLine,
  pointsToXml,
};
