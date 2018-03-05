import React, { Component } from 'react';
import './App.css';
import './App.js';
class TodoTable extends Component {
	
	constructor(props) {
      super(props);
	  this.state = {todos: []}
      }
	
	render() {	
	
		const itemRows = this.props.todos.map((item, index) => 
		<tr key={index}>
			<td>{item.date}</td>
			<td id="desc">{item.description}</td>
			<td><button onClick={this.props.delete} type="button" id={index}>Delete</button></td>
		</tr>
													 )
	
	    return (

        <div className="App">
          <table>
                <tbody>
                  <tr><th>Date</th><th>Description</th></tr>
                  {itemRows}
                </tbody>
              </table>
        </div>          
   
    );
	}
  }

export default TodoTable;