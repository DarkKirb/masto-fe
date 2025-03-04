import { RULES_FETCH_SUCCESS } from 'flavours/glitch/actions/rules';
import { List as ImmutableList, fromJS } from 'immutable';

const initialState = ImmutableList();

export default function rules(state = initialState, action) {
  switch (action.type) {
  case RULES_FETCH_SUCCESS:
    return state;
  default:
    return state;
  }
}
