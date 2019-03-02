import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Manu', age: 29 },
      { id:3, name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: true
  };

deletePersonHandler = (personIndex) => {
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons})

}

  nameChangedHander = (event, id) => {
    // function looks for id in state as compared to id passed in for each index. the index is stored in variable
    const personIndex = this.state.persons.findIndex( p =>{
      return p.id === id;
    });
    // person is from a DUPLICATE OF the array. const person is the index here
    const person = {
      ...this.state.persons[personIndex]
    };
    // the alternative is object.assign
    // const person = Object.assign({}, this.state.persons[personIndex]);
    // person .name is change (the copy of the array) 
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person; // asign index with NEW person
    this.setState({persons: persons}) // now setstae
    
  };

  togglePersonsHandler = (event) => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})

  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'Helvetica',
      padding: '8px',
      cursor: 'pointer',
      color: 'white',
      ':hover': {
        backgroundColor: 'white',
        color: 'black'
      },
      'transition': '.5s'
    }

    let persons = null;

    
    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) =>{
            return <Person
            /* arrow function so you can pass index as a parameter,
            bind is an alternative */
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            /* The key helps react. let's it compare elements of future with elements pf past and
            only update when it needs to update  */
            key={person.id} 
            /* anonymous function that passes on event and person.id */
            changed = {(event) => this.nameChangedHander(event, person.id)}/>
          })}
        </div>
      );
      // dynamically change style object
      style.backgroundColor = "red";
      style[':hover'] = {
        backgroundColor: 'black',
        color: 'white'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className ={classes.join(' ')}>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler }>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);