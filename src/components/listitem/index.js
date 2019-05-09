import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '../button';
import Input from '../input';
import './index.css';
import {
    setEditing,
    saveItem,
    deleteItem
} from '../../actions/index';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title : this.props.item.title || ''
        }
    }
    onEditChange(value) {
        this.setState({title: value});
    }
    editItem() {
        this.props.setEditing(this.props.item._id);
    }
    deleteItem() {
        this.props.deleteItem(this.props.item);
    }
    saveItem() {
        this.props.setEditing(null);
        this.props.saveItem({ ...this.props.item, ...this.state});
    }
    cancelEdit() {
        this.props.setEditing(null);
    }
    render() {
        return (
            <tr>
                <td>
                {(this.props.editingItem == null || (this.props.editingItem !== null && this.props.editingItem !== this.props.item._id)) && 
                (this.props.item.title)}
                {this.props.editingItem !== null && this.props.editingItem === this.props.item._id && (
                    <Input value={this.state.title} onChange={(value) => this.onEditChange(value)} />
                )}
                </td>
                <td>
                    {this.props.editingItem == null && (
                    <Button type='edit' onClick={() => this.editItem()}>
                        Edit
                    </Button>
                    )}
                    {this.props.editingItem == null && (
                    <Button type='delete' onClick={() => this.deleteItem()}>
                        Delete
                    </Button>
                    )}
                    {this.props.editingItem !== null && (
                    <Button type='edit' onClick={() => this.saveItem()}>
                        Save
                    </Button>
                    )}
                    {this.props.editingItem !== null && (
                    <Button type='delete' onClick={() => this.cancelEdit()}>
                        Cancel
                    </Button>
                    )}
                </td>
            </tr>
        )
    }
}
const mapStateToProps = state => ({
    editingItem: state.listReducers.editingItem,
});
const mapDispatchToProps = dispatch => ({
    setEditing: (id) => {
        dispatch(setEditing(id));
    },
    saveItem: (item) => {
        dispatch(saveItem(item));
    },
    deleteItem: (id) => {
        dispatch(deleteItem(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListItem);
