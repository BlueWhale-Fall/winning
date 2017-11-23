import axios from 'axios'

let state = {
  zoomData: null
};

let getters = {
  zooms({zoomData}) {
    return zoomData ? zoomData.BQInfos : [];
  }
};

let mutations = {
  settingZooms(state, zooms) {
    state.zoomData = zooms;
  }
};

let actions = {
  fetchZoomData({commit}) {
    axios.get('mock/db/zoomname.json')
      .then(({data}) => {
        commit('settingZooms', data);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
