import defaultState from './defaultState'
export default {
  increment(state: typeof defaultState) {
    state.count++
  }
}