#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-

function bake_all () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH"/../dist || return $?
  local RCP=
  local BFN=
  local ALL='__all__.xml'
  local EE='equalizationeffect'
  echo "<$EE>" >"$ALL" || return $?
  local CURVE=
  for RCP in ../recipes/*.mjs; do
    BFN="$(basename "$RCP")"
    BFN="${BFN%.*}"
    BFNS+=( "$BFN" )
    echo "${BFN}…"
    CURVE="$("$SELFPATH"/recipe2xml.mjs "$RCP")"
    case "$CURVE" in
      *'<point'* ) ;;
      * ) echo "E: There's no point in $BFN!" >&2; return 3;;
    esac
    echo "$CURVE=" >"$BFN".xml || return $?
    CURVE="${CURVE#<$EE>}"
    CURVE="${CURVE%</$EE>}"
    echo "$CURVE" >>"$ALL" || return $?
  done
  echo "</$EE>" >>"$ALL" || return $?
  return 0
}

[ "$1" == --lib ] && return 0; bake_all "$@"; exit $?
