import React, { Component } from "react";
import { connect } from 'react-redux';
import './index.css';
import ListItem from '../listitem';

import {
    loadList,
} from '../../actions/index';

export class List extends Component {
    componentDidMount() {
        this.props.loadList();
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th width='66%'>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.list.map(item => {
                        if(!item.hidden) return (
                            <ListItem key={item.title} item={item} />
                        )
                        else return null
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => ({
    list: state.listReducers.list
});

const mapDispatchToProps = dispatch => ({
    loadList: () => {
        dispatch(loadList());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(List);
