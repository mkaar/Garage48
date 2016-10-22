import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './views/Root';
import Home from './views/Home';


export default (
	<Route name="root" path="/" component={Root}>
		<IndexRoute name="home"  component={Home} />
		<Route name="home" path="*" component={Home} />
	</Route>
);
