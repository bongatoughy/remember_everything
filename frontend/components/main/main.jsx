import React from 'react';
import SearchbarContainer from './searchbar_container';
import NavigationContainer from './navigation_container';
import Filters from './filters';
import TaskIndexContainer from '../tasks/task_index_container';
import TaskShowContainer from '../tasks/task_show_container';

const Main = props => (
  <div className="main-container">
    <SearchbarContainer />
    <NavigationContainer />
    <div className="content-view clearfix">
      { props.children }
    </div>
  </div>
);

export default Main;
