import {ISlicesNames} from '../types';
import createGenericSlice, {IGenericState} from '../createGenericSlice';
import {ICommonState, IThemeNames} from './types';

const reducers = {
    setUserCoords: (state: IGenericState<ICommonState>, action: {payload: {lat: number; lng: number}}) => {
        state.data.userCoords = action.payload;
    },
};

const initialData = {
    theme: IThemeNames.light,
    userCoords: {lat: 49.82, lng: 24.03},
    language: 'en',
};

export const commonData = createGenericSlice<ICommonState, typeof reducers>({
    name: ISlicesNames.auth,
    initialState: {
        data: initialData,
        statuses: {},
        errors: {},
        lastRequestId: {},
    },
    reducers,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    extraReducers: () => {},
});

export const {resetSlice, setUserCoords} = commonData.actions;
export default commonData.reducer;
