#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-

function rebuild_all () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m "$BASH_SOURCE"/..)"
  cd "$SELFPATH"/../recipes || return $?
  local ITEM=
  for ITEM in *.mjs; do
    echo "$ITEM…"
    nodemjs "$ITEM" >../dist/"${ITEM%.mjs}".xml || return $?
  done
  return 0
}

[ "$1" == --lib ] && return 0; rebuild_all "$@"; exit $?
