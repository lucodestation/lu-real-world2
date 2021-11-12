import store from '@/store';

const errorHandle = (error) => {
  if (!error || error.length === 0) {
    store.commit('changeErrorArray', []);
    return;
  }

  if (typeof error === 'string') {
    // 把错误信息提交到 store
    store.commit('changeErrorArray', [error]);
    return;
  }

  if (Array.isArray(error)) {
    store.commit('changeErrorArray', error);
    return;
  }

  store.commit('changeErrorArray', [
    Object.keys(error)[0] + ' ' + Object.values(error)[0]
  ]);
};

const wait = function (t) {
  return new Promise((r) => setTimeout(r, t));
};

export { errorHandle, wait };
