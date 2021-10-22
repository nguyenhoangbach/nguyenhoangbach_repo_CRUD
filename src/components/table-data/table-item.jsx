import React, { useState } from 'react';
import PropTypes from 'prop-types';

TableItems.propTypes = {
    onDeleteItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
}
TableItems.default = {
    onDeleteItem: null,
    onUpdateItem: null
}


function TableItems(props) {

    // const [isUpdate, setIsUpdate] = useState(false)


    const { data } = props;
    const onDeleteItem = props.onDeleteItem;

    const onUpdateItem = (data) => {
        props.onUpdateItem(data)
        // setIsUpdate(true)
    }

    const onDroptItem = (id) => {
        if (confirm(`Bạn thực sự muốn xóa id: ${id}? `)) {
            onDeleteItem(id)
        }
    }

    let el_item;
    if (data.length !== 0) {
        el_item = data.map((item) => {
            return (
                <tr
                    title={`id: ${item.id}`}
                    key={item.id}
                >
                    <td className="table-wraps__title">
                        {item.id}
                    </td>
                    <td className="table-wraps__title">
                        {item.name}
                    </td>
                    <td className="table-wraps__title">
                        {item.email}
                    </td>
                    <td className="table-wraps__title">
                        {item.gender}
                    </td>
                    <td className="table-wraps__title">
                        {item.status}
                    </td>
                    <td className="table-wraps__button">
                        <button
                            title="Update"
                            type="button"
                            onClick={() => onUpdateItem(item)}
                            className="btn btn-success mr-10">
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                            title="Drop"
                            type="button"
                            onClick={() => onDroptItem(item.id)}
                            className="btn btn-danger">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    else {
        el_item = <tr>
            <td colSpan="6" className="table-search-failed">
                <h1>There is not any information!</h1>
                <h2>Try to enter search value.</h2>
            </td>
        </tr>
    }
    return (
        <tbody>
            {el_item}
        </tbody>
    );
}
export default TableItems;