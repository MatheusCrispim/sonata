import * as userActions from './challenge/actions/actions';
import * as challengesActions from './challenge/actions/actions';
import * as contextsActions from './context/actions/actions';

export default {...userActions, ...challengesActions, ...contextsActions};

