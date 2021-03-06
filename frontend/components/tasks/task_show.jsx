import React from 'react';
import { Link, withRouter } from 'react-router';
import { objectToArray } from '../../util/selectors';

class TaskShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { name: "", due_date: "", list_id: "", estimate: "" }
  }

  componentDidMount() {
    this.props.fetchTask(this.props.params.taskId)
      .then(() => this.setState(this.props.task));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params !== newProps.params){
      this.setState(newProps.task);
    }
  }

  componentWillUnmount() {
    const taskShow = document.querySelector(".task-show-container");
    taskShow.classList.add(".slide-out");
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    let somethingChanged = false;
    e.preventDefault();
    Object.keys(this.state).forEach(key => {
      if (this.state[key] !== this.props.task[key]) {
        somethingChanged = true;
        this.props.updateTask(this.state)
          .then(() => this.props.toggleSuccess(true));
      }
    });
    if (!somethingChanged) {
      this.props.toggleSuccess(false);
    }
  }

  handleErrors(key) {
    let returnError = null;
    if (this.props.errors) {
      this.props.errors.forEach((error) => {
        if (error.includes(key)) {
          returnError = <p className="error">{error}</p>;
        }
      });
    }
    return returnError
  }

  showSuccessMessage() {
    let returnSuccess = null;
    if (this.props.success) {
      returnSuccess = <p className="success">Task updated!</p>
    }
    return returnSuccess;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }




  render () {
    const task = this.state;
    if (!task) {
      return <div>Loading...</div>;
    }

    return (
      <div className="task-show-container">
        <div className="close clearfix">
          <Link to={"/"}>
            close <i className="fa fa-times" aria-hidden="true"></i>
          </Link>
        </div>
        <form className="task-show-form" onKeyPress={this.handleKeyPress.bind(this)}>
          {this.handleErrors("Name")}
          <div className="task-show-heading">
            <div className="mini-line"></div>
            <input
              type="text"
              value={task.name}
              onChange={this.update('name')}
              onBlur={this.handleSubmit} />
          </div>

          <div className="other-fields">
            <div className="due-date-wrapper clearfix">
              <label>due</label>
              <input
                type="date"
                value={task.due_date ? task.due_date : ""}
                onChange={this.update('due_date')}
                onBlur={this.handleSubmit} />
            </div>
            <div className="clearfix">
              <label>list</label>
              <select
                value={this.state.list_id ? this.state.list_id : ""}
                onChange={this.update('list_id')}
                onBlur={this.handleSubmit} >
                <option value=""></option>
                {
                  objectToArray(this.props.lists).map(list => (
                    <option
                      value={list.id}
                      key={list.id}>
                      {list.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="clearfix">
              <label>estimate</label>
              <input
                className="estimate-input"
                type="text"
                value={task.estimate ? task.estimate : ""}
                onChange={this.update('estimate')}
                onBlur={this.handleSubmit}
                placeholder="time"/>
              <span className="estimate-units">minutes</span>
            </div>
          </div>
          {this.handleErrors("Estimate")}
          {this.showSuccessMessage.bind(this)()}
        </form>
      </div>
    );
  }
}

export default withRouter(TaskShow);
