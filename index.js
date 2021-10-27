import { module } from "./vuex";

//  interfacing package to the vuex store
const vuex = { store: null };
const opts = {
  min: [699],
  mid: [700, 1023],
  mode: [1024, 1299],
  max: [1300],
  xminH: [49],
  minH: [500, 699],
  midH: [700, 849],
  modeH: [850, 999],
  maxH: [1000],
};

const { min, mid, mode, max, xminH, minH, midH, modeH, maxH } = opts;

// sizeWacher for checking the size the viewport
function isMin() {
  const mql = window.matchMedia(`(max-width: ${min[0]}px)`);

  //mutate the min size
  vuex.store.commit("$br/MIN", mql.matches);
}

function isMid() {
  const mql = window.matchMedia(
    `(min-width: ${mid[0]}px) and (max-width: ${mid[1]}px)`
  );

  //mutate the min size
  vuex.store.commit("$br/MID", mql.matches);
}
function isMode() {
  const mql = window.matchMedia(
    `(min-width: ${mode[0]}px) and (max-width: ${mode[1]}px)`
  );

  //mutate the min size
  vuex.store.commit("$br/MODE", mql.matches);
}
function isMax() {
  const mql = window.matchMedia(`(min-width: ${max[0]}px)`);

  //mutate the min size
  vuex.store.commit("$br/MAX", mql.matches);
}

function isXMinH() {
  const mql = window.matchMedia(`(max-height: ${xminH[0]}px)`);

  //mutate the minH size
  vuex.store.commit("$br/XMIN_H", mql.matches);
}
function isMinH() {
  const mql = window.matchMedia(
    `(min-height: ${minH[0]}px) and (max-height: ${minH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MIN_H", mql.matches);
}
function isMidH() {
  const mql = window.matchMedia(
    `(min-height: ${midH[0]}px) and (max-height: ${midH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MID_H", mql.matches);
}

function isModeH() {
  const mql = window.matchMedia(
    `(min-height: ${modeH[0]}px) and (max-height: ${modeH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MODE_H", mql.matches);
}

function isMaxH() {
  const mql = window.matchMedia(`(min-height: ${maxH[0]}px)`);

  //mutate the minH size
  vuex.store.commit("$br/MAX_H", mql.matches);
}

// caller calls all tthe utility functions to continuosly check the media query
function caller() {
  isMin();
  isMid();
  isMode();
  isMax();
  isMinH();
  isXMinH();
  isMidH();
  isModeH();
  isMaxH();
}

// sizeWatcher the watchman for the breakpoints
export function sizeWatcher() {
  window.onload = caller;
  window.onresize = caller;
}

// Vue plugin for configuring breakpoints and accessing vuex store
export default ({
  min = [699],
  mid = [700, 1023],
  mode = [1024, 1299],
  max = [1300],
  xminH = [49],
  minH = [500, 699],
  midH = [700, 849],
  modeH = [850, 999],
  maxH = [, 1000],
}) => {
  opts.min = min;
  opts.mid = mid;
  opts.mode = mode;
  opts.max = max;
  opts.xminH = xminH;
  opts.minH = minH;
  opts.midH = midH;
  opts.modeH = modeH;
  opts.maxH = maxH;

  // return a vuex plugin
  return (store) => {
    vuex.store = store;

    store.registerModule("$br", module);

    // start the sizeWatcher
    sizeWatcher();
  };
};
