import { connect } from 'react-redux';
import ListIndex from './list_index';
import { fetchLists, createList } from '../../actions/list_actions';

const mapStateToProps = state => ({
  lists: Object.keys(state.lists).map(id => state.lists[id]),
  tasks: Object.keys(state.tasks.tasks).map(id => state.tasks.tasks[id])
});

const mapDispatchToProps = dispatch => ({
  fetchLists: () => dispatch(fetchLists()),
  createList: list => dispatch(createList(list))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIndex);
