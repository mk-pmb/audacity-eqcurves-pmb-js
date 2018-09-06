// -*- coding: utf-8, tab-width: 2 -*-

function flatMap(list, iter, onto) {
  return (onto || []).concat(...list.map(iter));
}

export default flatMap;
