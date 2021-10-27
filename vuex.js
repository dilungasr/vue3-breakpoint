//br vuex module for keeping track of vue page's breakpoints
export const module = {
  namespaced: true,
  state: {
    min: false,
    mid: false,
    mode: false,
    max: false,
    xminH: false,
    minH: false,
    midH: false,
    modeH: false,
    maxH: false,
  },
  mutations: {
    MIN(state, isMin) {
      state.min = isMin;
    },
    MID(state, isMid) {
      state.mid = isMid;
    },
    MODE(state, isMode) {
      state.mode = isMode;
    },
    MAX(state, isMax) {
      state.max = isMax;
    },
    XMIN_H(state, isXMinH) {
      state.xminH = isXMinH;
    },
    MIN_H(state, isMinH) {
      state.minH = isMinH;
    },
    MID_H(state, isMidH) {
      state.midH = isMidH;
    },
    MODE_H(state, isModeH) {
      state.modeH = isModeH;
    },
    MAX_H(state, isMaxH) {
      state.maxH = isMaxH;
    },
  },
};
