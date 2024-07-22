import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTask: '',
      taskList: [],
      showEdit: -1,
      updatedText: ''
    };
  }

  addTaskItem = () => {
    if (this.state.addTask.trim() !== '') {
      const newTask = {
        id: Math.floor(Math.random() * 10000),
        value: this.state.addTask
      };
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        addTask: ''
      }));
    }
  };

  deleteTask = (id) => {
    this.setState(prevState => ({
      taskList: prevState.taskList.filter(item => item.id !== id)
    }));
  };

  editItem = (id, newText) => {
    this.setState(prevState => ({
      taskList: prevState.taskList.map(item => 
        item.id === id ? { ...item, value: newText } : item
      ),
      updatedText: '',
      showEdit: -1
    }));
  };

  handleEditChange = (event) => {
    this.setState({ updatedText: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Todo List App</h1>
        <input
          type="text"
          placeholder="ADD LIST"
          value={this.state.addTask}
          onChange={(e) => this.setState({ addTask: e.target.value })}
        />
        <button onClick={this.addTaskItem}>ADD</button>
        <ul>
          {this.state.taskList.map(item => (
            <div key={item.id}>
              <li>
                <Link to={`/task/${item.id}`}>{item.value}</Link>
                <button onClick={() => this.deleteTask(item.id)}>X</button>
                {this.state.showEdit === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={this.state.updatedText}
                      onChange={this.handleEditChange}
                    />
                    <button onClick={() => this.editItem(item.id, this.state.updatedText)}>
                      Update
                    </button>
                  </div>
                ) : (
                  <button onClick={() => this.setState({ showEdit: item.id })}>
                    Edit
                  </button>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
