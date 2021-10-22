import React, {useState} from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination : PropTypes.object.isRequired,
    onPageChange : PropTypes.func,
};
Pagination.default = {
    onPageChange : null
}

function Pagination(props) {

    const pagination = props.pagination
    const {page, total, pages} = pagination;
    const [select, setSelect] = useState(page); 


    const onPageChange =(newPage)=>{
        props.onChangePage(newPage)
    }

    // render ra số lượng thẻ option để chọn trang
    const pagination_select =()=>{
       let a = [];
       for (let i = 1; i <= pages ; i ++)
       {
           a.push(<option key = {i} value={i}>{i}</option>)
       }
       return a;
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        props.onChangePage(select)
    }

    // xử lí với thẻ Select trong form 
    // Khi giá trị trong đó thay đổi thì gọi lại hàm onPageChange và truyền vào giá trị mới
    const onChange=(e)=>{
        setSelect(e.target.value)
    }


    return (
        <div className="pagination-container" >
        <div className="pagination-inner">
            <button 
            title= "prev"
            type="button" 
            className="btn btn-danger pagination-btn"
            onClick = {()=>onPageChange(page -1)}
            // disable= {page <= 1? true : false}
            >
            Pre</button>

            {/* ở giữa này sẽ là các số trang */}

            <div className="pagination-view">
                <b>{total}</b> <span> results -</span> 
                <span>Page </span> <b>{page}</b> 
                <span> of </span> <b>{pages}</b>
            </div>

            <button 
            title="next"
            type="button" 
            className="btn btn-danger pagination-btn"
            onClick = {()=>onPageChange(page + 1)}
            // disable= {page >= pages? true : false}
            >
                Next
            </button>  
        </div>
        <div className="pagination-select">
            <form onSubmit={onSubmit}>
                <div className="form-group pagination-form">
                    <select 
                        name=""
                        id="input" 
                        className="form-control " 
                        required="required"
                        value = {select}
                        onChange = {(event)=>onChange(event)}
                        >
                       {pagination_select()}
                    </select>
                    <button 
                    type="submit" 
                    className="btn btn-danger"
                    title="Go to page">
                        <i className="fas fa-arrow-circle-right"></i>
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
       
}

export default Pagination;










