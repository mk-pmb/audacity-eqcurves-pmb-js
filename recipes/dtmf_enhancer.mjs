// -*- coding: utf-8, tab-width: 2 -*-

import dtmfFacts from '../facts/dtmf';
import eqCurve from '../src/lib_eqcurve';

const curve = { name: 'DTMF enhancer' };
const shape = [
  { dist: 0, gain: 6 }, // gain too low? just repeat EQ a few times.

  /*
  Having points in between is useless because Audacity has limits
  on how bendy the effectively used curve (green line) is. See
  https://manual.audacityteam.org/man/equalization.html

  Unfortunately I haven't found any option to zoom the equalizer
  graph or to restrict its displayed range in Audacity 2.0.5,
  so to actually see it, select "linear frequency scale" and make
  the window absurdly huge:
  wmctrl -r Equaliz -e 0,-1700,-700,28000,2000
  Make sure you don't have any other windows with similar titles open.
  Might take up to two repeats until it's positioned correctly.
  */

  { dist: 30, gain: 0 },
  /*
  A more narrow curve would just result in a lower effective peak
  due to the same bendiness restrictions. (Tested with a 22050 Hz
  sample rate file.) The minimum distance seems to be independent
  from peak gain.
  */
];
curve.points = eqCurve.symmetricEnvelope(dtmfFacts.freqs, shape);
export default curve;
