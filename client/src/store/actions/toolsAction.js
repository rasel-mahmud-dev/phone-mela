
import { TOGGLE_BACKDROP  } from "./types"

export const toggleBackdrop = (state)=> {
  return {
    type: TOGGLE_BACKDROP,
    payload: state
  }
}