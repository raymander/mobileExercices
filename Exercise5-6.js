import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

	inputChanged = (event) => {
this.setState({[event.target.name]: event.target.value});

}
	
  addTodo = (event) => {
    event.preventDefault(); 
  
    const newTodo = {date: this.state.date, description: this.state.description}
	  this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }
  
removeTodo(item) {
  const newItems = this.state.todos.filter(newTodo=> {
    return newTodo !==item
});
	

  this.setState ({
    todos: [...newItems]
})
  
}
  render() {
	   
	const itemRows = this.state.todos.map((item, index) => 
<tr key={index}>
<td>{item.date}</td>
<td id="desc">{item.description}</td>
<td><button onClick={(e) => this.removeTodo(item)} type="button">Delete</button></td></tr>
											 )
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
         <form onSubmit={this.addTodo}>
            <input type="date" name="date" onChange={this.inputChanged} value={this.state.date}/>
			<input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/>
            <input type="submit" value="Add"/>
          </form>

        </div>
        <div>
          <table>
                <tbody>
                  <tr><th>Date</th><th>Description</th></tr>
                  {itemRows}
                </tbody>
              </table>

        </div>          
      </div>    
    );
  }
}

export default App;