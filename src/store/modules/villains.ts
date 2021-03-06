import { ActionContext } from 'vuex';
import { addVillain, deleteVillain, getVillains, updateVillain } from '../data';
import { Villain } from './models';
import {
  ADD_VILLAIN,
  DELETE_VILLAIN,
  GET_VILLAINS,
  UPDATE_VILLAIN,
} from './mutation-types';
import { RootState, VillainsState } from './types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  // namespaced: true,
  state: {
    villains: [],
  },
  mutations: {
    [ADD_VILLAIN](state: VillainsState, villain: Villain) {
      state.villains.unshift(villain);
    },
    [UPDATE_VILLAIN](state: VillainsState, villain: Villain) {
      const index = state.villains.findIndex((v) => v.id === villain.id);
      state.villains.splice(index, 1, villain);
      state.villains = [...state.villains];
    },
    [GET_VILLAINS](state: VillainsState, villains: Villain[]) {
      state.villains = villains;
    },
    [DELETE_VILLAIN](state: VillainsState, villain: Villain) {
      state.villains = [...state.villains.filter((p) => p.id !== villain.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getVillainsAction({
      commit,
    }: ActionContext<VillainsState, RootState>) {
      try {
        const villains = await getVillains();
        commit(GET_VILLAINS, villains);
        return villains;
      } catch (error) {
        captains.error(error);
      }
    },
    async deleteVillainAction(
      { commit }: ActionContext<VillainsState, RootState>,
      villain: Villain,
    ) {
      try {
        await deleteVillain(villain.id);
        commit(DELETE_VILLAIN, villain);
        return null;
      } catch (error) {
        captains.error(error);
      }
    },
    async updateVillainAction(
      { commit }: ActionContext<VillainsState, RootState>,
      villain: Villain,
    ) {
      try {
        const updatedVillain = await updateVillain(villain);
        commit(UPDATE_VILLAIN, updatedVillain);
        return updatedVillain;
      } catch (error) {
        captains.error(error);
      }
    },
    async addVillainAction(
      { commit }: ActionContext<VillainsState, RootState>,
      villain: Villain,
    ) {
      try {
        const addedVillain = await addVillain(villain);
        commit(ADD_VILLAIN, addedVillain);
        return addedVillain;
      } catch (error) {
        captains.error(error);
      }
    },
  },
  getters: {
    villains: (state: VillainsState) => state.villains,
  },
};
