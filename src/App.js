import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import List from './components/list';
import Input from './components/input';
import Button from './components/button';

import {
    addNewItem,
    cancelError
} from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }
    cancelError() {
        this.props.cancelError();
    }
    addNewItem() {
        this.props.addNewItem({ title: this.state.value });
        this.setState({ value: '' });
    }
    render() {
        // if (this.props.error) {
        //     alert(this.props.error.message);
        // }
        return (
            <div className="container">

                <h1>Todo List</h1>
                {this.props.error && (
                <div className="alert">
                    <span className="closebtn" onClick={() => this.cancelError()}>&times;</span>
                    An error has occured
                </div>
                )}
                <div className='add-item-to-list'>
                    <Input
                        name='item'
                        placeholder='New Item...'
                        onChange={(value) => this.setState({ value })}
                        value={this.state.value}
                    />
                    <Button onClick={() => this.addNewItem()} type='add'>
                        Add
                    </Button>
                </div>

                <List />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    error: state.listReducers.error,
});

const mapDispatchToProps = dispatch => ({
    addNewItem: (item) => {
        dispatch(addNewItem(item));
    },
    cancelError: () => {
        dispatch(cancelError());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
