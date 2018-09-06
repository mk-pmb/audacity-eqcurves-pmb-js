#!/usr/bin/env nodemjs
// -*- coding: utf-8, tab-width: 2 -*-

import eqCurve from '../src/lib_eqcurve';

async function nodemjsCliMain(rcpFile) {
  const rcp = (await import(rcpFile)).default;
  console.log(eqCurve.pointsToXml(rcp).join('\n'));
}

export default { nodemjsCliMain };
