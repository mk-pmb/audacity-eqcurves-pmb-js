
<!--#echo json="package.json" key="name" underline="=" -->
audacity-eqcurves-pmb
=====================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
My collection of equalizer presets for Audacity.
<!--/#echo -->


`recipes/*.mjs` &rarr; `./util/bake_all.sh` &rarr; `dist/*.xml`


<!--#toc stop="scan" -->


To do
-----

Feel free to remind me on the bug tracker
if you're interested in some of these:

* Make a comfortable preview for what would be the effective curve
  used by audacity, given the points defined in some EQCurve file.
  * Upgrade to full-fledged editor.




Known issues
------------

* Needs more/better tests and docs.




&nbsp;

License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
