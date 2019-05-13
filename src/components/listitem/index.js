import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '../button';
import Input from '../input';
import './index.css';
import {
    saveItem,
    deleteItem
} from '../../actions/index';

export class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title : this.props.item.title || '',
            isEditing: false,
        }
    }
    onEditChange(value) {
        this.setState({title: value});
    }
    editItem() {
        this.setState({isEditing: true});
    }
    deleteItem() {
        this.setState({isEditing: false});
        this.props.deleteItem(this.props.item);
    }
    saveItem() {
        this.setState({isEditing: false});
        this.props.saveItem({ ...this.props.item, ...this.state});
    }
    cancelEdit() {
        this.setState({title: this.props.item.title, isEditing: false});
    }
    render() {
        //console.log(this.props.item);
        return (
            <tr className="list-item-row">
                <td>
                {!this.state.isEditing && (
                this.props.item.title)}
                {this.state.isEditing && (
                    <Input value={this.state.title} onChange={(value) => this.onEditChange(value)} />
                )}
                </td>
                <td>
                    {!this.state.isEditing && (
                    <Button type='edit' onClick={() => this.editItem()}>
                        Edit
                    </Button>
                    )}
                    {!this.state.isEditing && (
                    <Button type='delete' onClick={() => this.deleteItem()}>
                        Delete
                    </Button>
                    )}
                    {this.state.isEditing && (
                    <Button type='edit' onClick={() => this.saveItem()}>
                        Save
                    </Button>
                    )}
                    {this.state.isEditing && (
                    <Button type='delete' onClick={() => this.cancelEdit()}>
                        Cancel
                    </Button>
                    )}
                </td>
            </tr>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    saveItem: (item) => {
        dispatch(saveItem(item));
    },
    deleteItem: (id) => {
        dispatch(deleteItem(id));
    },
});

export default connect(
    null,
    mapDispatchToProps,
)(ListItem);
