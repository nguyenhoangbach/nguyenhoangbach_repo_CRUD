import React from 'react';
import PropTypes from 'prop-types';
import TableItems from './table-item';

TableWraps.propTypes = {
    data: PropTypes.array,
    onUpdateItem: PropTypes.func,
};
TableWraps.default = {
    data: [],
    onUpdateItem: null
};

function TableWraps(props) {
    const data = props.data;
    const onDeleteItem = props.onDeleteItem

    // DELETE
    const onDelete = (id) => {
        onDeleteItem(id)
    }

    // UPDATE
    const onUpdateItem = (data, isUpdate) => {
        props.onUpdateItem(data)
    }
    return (
        <table className="table table-hover "
            align="center" >
            <thead>
                <tr>
                    <th
                        className="table-wraps__title "
                    >
                        ID
                    </th>
                    <th
                        className="table-wraps__title "
                    >
                        Name
                    </th>
                    <th
                        className="table-wraps__title "
                    >
                        Email
                    </th>
                    <th
                        className="table-wraps__title "
                    >
                        Gender
                    </th>
                    <th
                        className="table-wraps__title"
                    >
                        Status
                    </th>
                    <th
                        className="table-wraps__title "
                    >
                        Action
                    </th>
                </tr>
            </thead>
            <TableItems
                data={data}
                onDeleteItem={onDelete}
                onUpdateItem={onUpdateItem}
            />
        </table>


    );
}

export default TableWraps;





