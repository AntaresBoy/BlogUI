import defaultState from './defaultState'
export default {
  double(state: typeof defaultState) {
    return 2 * state.count
  }
}