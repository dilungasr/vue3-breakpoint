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



// sizeWacher for checking the size the viewport
function isMin() {
  const mql = window.matchMedia(`(max-width: ${opts.min[0]}px)`);

  //mutate the min size
  vuex.store.commit("$br/MIN", mql.matches);
}

function isMid() {
  const mql = window.matchMedia(
    `(min-width: ${opts.mid[0]}px) and (max-width: ${opts.mid[1]}px)`
  );

  //mutate the min size
  vuex.store.commit("$br/MID", mql.matches);
}
function isMode() {
  const mql = window.matchMedia(
    `(min-width: ${opts.mode[0]}px) and (max-width: ${opts.mode[1]}px)`
  );

  //mutate the min size
  vuex.store.commit("$br/MODE", mql.matches);
}
function isMax() {
  const mql = window.matchMedia(`(min-width: ${opts.max[0]}px)`);

  //mutate the min size
  vuex.store.commit("$br/MAX", mql.matches);
}

function isXMinH() {
  const mql = window.matchMedia(`(max-height: ${opts.xminH[0]}px)`);

  //mutate the minH size
  vuex.store.commit("$br/XMIN_H", mql.matches);
}
function isMinH() {
  const mql = window.matchMedia(
    `(min-height: ${opts.minH[0]}px) and (max-height: ${opts.minH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MIN_H", mql.matches);
}
function isMidH() {
  const mql = window.matchMedia(
    `(min-height: ${opts.midH[0]}px) and (max-height: ${opts.midH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MID_H", mql.matches);
}

function isModeH() {
  const mql = window.matchMedia(
    `(min-height: ${opts.modeH[0]}px) and (max-height: ${opts.modeH[1]}px)`
  );

  //mutate the minH size
  vuex.store.commit("$br/MODE_H", mql.matches);
}

function isMaxH() {
  const mql = window.matchMedia(`(min-height: ${opts.maxH[0]}px)`);

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
  // test the media query just after instantiating the store
  caller();
  window.onresize = caller;
}

// Vue plugin for configuring breakpoints and accessing vuex store
export default (options = opts) => {
  const {
    min = [699],
    mid = [700, 1023],
    mode = [1024, 1299],
    max = [1300],
    xminH = [49],
    minH = [500, 699],
    midH = [700, 849],
    modeH = [850, 999],
    maxH = [, 1000],
  } = options;

  // set the configuration to the options object
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
