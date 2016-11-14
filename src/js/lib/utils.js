export const throttle = (fn, {threshold = 250, _this}) => {
  let last = 0;
  let timerId;
  return function() {
    let now = +Date.now();
    let args = arguments;
    if(last && now < (last + threshold)) {
      clearTimeout(timerId);
      timerId = setTimeout(function() {
        last = now;
        fn.apply(_this || null, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(_this || null, args);
    }
  }
};