import { module } from "./vuex";

//  interfacing package to the vuex store
const vuex = { store: null };

// default breakpoints
const opts = {
  min: [, 699],
  mid: [700, 1023],
  mode: [1024, 1299],
  max: [1300],
  xminH: [499],
  minH: [500, 699],
  midH: [700, 849],
  modeH: [850, 999],
  maxH: [1000],
};

// caller calls all all the media query watcher functions to test the media query (Call Of Duty)
function caller() {
  for (let i = mediaQueryHandlers.length; i--; ) {
    mediaQueryHandlers[i]();
  }
}

// sizeWatcher the watchman for the breakpoints
export function sizeWatcher() {
  // test the media query just after instantiating the store
  caller();
  // test media query onresize
  window.onresize = caller;
}

// mediaQueryHandlers stores the function that tests the defined media queries
const mediaQueryHandlers = [];

// Vue plugin for configuring breakpoints and accessing vuex store
export default (options = opts) => {
  //update configurations
  const configuredOpts = Object.entries(options);
  for (let i = configuredOpts.length; i--; ) {
    const key = configuredOpts[i][0];
    const val = configuredOpts[i][1];

    // update the opts configurations
    opts[key] = val;
  }

  // create store, updators and media query watchers for each configuration
  const allOpts = Object.entries(opts);
  for (let i = allOpts.length; i--; ) {
    const key = allOpts[i][0];
    const val = allOpts[i][1];

    // check if value is of array type
    if (!Array.isArray(val)) {
      throw new Error(`breakpoint ${key} should be of array type`);
    }

    //add configuration to the module state with an initial state
    module.state[key] = false;

    // add mutation for updating the configuration
    module.mutations[`${key.toUpperCase()}`] = (state, payload) => {
      state[key] = payload;
    };

    // INTERPRET VALUES TO CREATE MEDIA QUERY STRING
    const measure = key.charAt(key.length - 1) === "H" ? "height" : "width";

    //   media query string
    let mqlStr = "";
    const boundCount = val.length;

    // both upper and lower bound defined
    if (boundCount === 2) {
      // if only upper boud is defined undefined(for max only)
      if (typeof val[0] === "undefined" && typeof val[1] === "number") {
        mqlStr = `(max-${measure}: ${val[1]}px)`;
      }
      //if both upper and lower bound defined
      else if (typeof val[0] === "number" && typeof val[1] === "number") {
        mqlStr = `(min-${measure}: ${val[0]}px) and (max-${measure}: ${val[1]}px)`;
      }
      //invalid value
      else {
        throw new Error(`breakpoint '${key}' has one or more invalid value `);
      }
    }

    // only lower bound defined
    else if (boundCount === 1) {
      if (typeof val[0] === "number") {
        mqlStr = `(min-${measure}: ${val[0]}px)`;
      }
      //invalid value
      else {
        throw new Error(`breakpoint '${key}' has one or more invalid value`);
      }
    }

    // invalid syntaxy
    else {
      throw new Error(
        `breakpoint ${key} should only have  1 or 2 values and not less or more`
      );
    }

    // CREATE MEDIA QUERY HANDLER FUNCTION
    const mediaQueryHandler = () => {
      const mql = window.matchMedia(mqlStr);

      // fire the mutation to update breakpoint
      vuex.store.commit(`$br/${key.toUpperCase()}`, mql.matches);
    };
    // add media query watcher handler
    mediaQueryHandlers.push(mediaQueryHandler);
  }

  // CREATE VUEX PLUGIN TO ACCESS THE STORE AS SOON AS THE STORE INITIALIZED
  return (store) => {
    vuex.store = store;

    store.registerModule("$br", module);

    // start the sizeWatcher
    sizeWatcher();
  };
};
