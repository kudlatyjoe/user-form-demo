import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';
import * as fromUser from './user.reducer'

export interface State {
  user: User
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectUser = (state: State) => state.user
