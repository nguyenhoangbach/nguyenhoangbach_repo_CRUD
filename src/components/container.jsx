import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "./component.css";
import TableWraps from './table-data/table';
import handleDataApi from './APIHandle/api-handle';
import Pagination from './pagination/pagination';
import Search from './form/form-search';
import FormInput from './form/form-input';
import IsNumber from './function-logic/isNumber';
import allAction from './react-redux/actions';

function Container() {

    //#region GetStateFromRedux 

    const openReducer = useSelector(state => state.openReducer)
    // state xác định mở và đóng form 

    const isUpdateReducer = useSelector(state => state.isUpdateReducer)
    // kiểm tra xem đang update hay thêm

    const id = useSelector(state => state.idReducer)
    // xác định id của field đang click

    const response = useSelector(state => state.responseReducer)
    // state này lưu dữ liệu trả về từ API

    const filter = useSelector(state => state.filterReducer)
    // state này là 1 dependencies chứa thông tin về trang người dùng cần hiển thị

    const pagination = useSelector(state => state.paginationReducer)
    // state này lưu thông tin về trang hiện tại trả về từ API

    const dataBinding = useSelector(state => state.dataBindingReducer)
    // state này để xác định data từ item đang click và sẽ bind vào các field tương ứng

    //#endregion 

    //#region Dispatch 

    const dispatch = useDispatch()

    //#endregion

    //#region Open 
    const onOpen = () => {
        dispatch(allAction.openAction.openAction())
    }
    //#endregion

    //#region Close
    const onClose = () => {
        onOpen()
    }
    //#endregion

    //#region Pagination
    const onPageChange = (newPage) => {
        dispatch(allAction.filterAction.filterAction({
            ...filter,
            page: newPage
        }))
    }
    //#endregion

    //#region CallApiToFetchData
    const callApiToFetchData = () => {
        handleDataApi(`https://gorest.co.in/public/v1/users?page=${filter.page}`,
            {
                method: "GET",
            })
            .then((response) => {
                const { data } = response;
                const pagination = response.meta.pagination;
                dispatch(allAction.paginationAction.paginationAction(pagination))
                dispatch(allAction.responseAction.responseAction(data));
            })
            .catch(() => {
                alert("Failed to fetch data2")
            })
    }
    //#endregion

    //#region UseEffect
    useEffect(() => {
        callApiToFetchData()
    }, [filter]);
    //#endregion

    //#region Reload
    const reload = () => {
        callApiToFetchData()
    }
    //#endregion

    //#region Delete
    const onDeleteItem = (id) => {
        handleDataApi(`https://gorest.co.in/public/v1/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer 9c729dfae96ae5c25e064bf8ee1dba789afe655a625a642e33fe4842ac3ced24"
                }
            })
            .catch((err) => {
                console.log(err)
            })
        alert(`The item has id:${id} had been removed!`)

        // xóa xong thì gọi lại API
        callApiToFetchData()
    }
    //#endregion

    //#region AddItem
    const onHandleAddItem = () => {
        dispatch(allAction.dataBindingAction.dataBidingAction({}));
        onOpen()
        dispatch(allAction.isUpdateAction.isUpdateAction(false))
    }
    //#endregion

    //#region Update
    const onUpdateItem = (data) => {
        onOpen()
        dispatch(allAction.idAction.idAction(data.id))
        dispatch(allAction.dataBindingAction.dataBidingAction(data));
        dispatch(allAction.isUpdateAction.isUpdateAction(true))
    }
    //#endregion

    //#region Search
    const onSearch = (data) => {
        if (IsNumber(data)) {
            onSearchById(data);
        }
        else {
            onSearchByName(data)
        }
    }
    //#endregion

    //#region SearchByName
    const onSearchByName = (data) => {
        console.log(data)
        handleDataApi(`https://gorest.co.in/public/v1/users?name=${data}`,
            {
                method: "GET",
            })
            .then((response) => {
                const { data } = response;
                dispatch(allAction.responseAction.responseAction(data));
            })
            .catch(() => {
                alert("Failed to fetch data")
            })
    }
    //#endregion

    //#region SearchById
    const onSearchById = (id) => {
        handleDataApi(`https://gorest.co.in/public/v1/users/${id}`,
            {
                method: "GET",
            })
            .then((response) => {
                const { data } = response;
                dispatch(allAction.responseAction.responseAction([data]));
            })
            .catch(() => {
                alert("Failed to fetch data")
            })
    }
    //#endregion

    //#region SubmitToCreateDataForm
    const onSubmit = (data) => {
        !isUpdateReducer ?
            // kiểm tra có phải là đang update hay không
            handleDataApi("https://gorest.co.in/public/v1/users",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 9c729dfae96ae5c25e064bf8ee1dba789afe655a625a642e33fe4842ac3ced24'
                    }
                },
                data)
                .then((response) => {
                    // nếu thất bại thì 1 trong các trường sẽ có giá trị null
                    // kiểm tra nếu null thì show thông báo chứ không đóng form nhập
                    // cách đơn giản hơn là kiểm tra response.statusCode 
                    if (response.data.id !== null) {
                        alert(`Added successfully! 
                            Id: ${response.data.id} 
                            Info: 
                            Name: ${response.data.name} 
                            Email: ${response.data.email} 
                            Gender: ${response.data.gender} 
                            Status: ${response.data.status} 
                            `)
                    }
                    else {
                        console.log(response.data.message)
                    }
                    console.log(response)
                    onSearchById(response.data.id)
                    // thêm item xong thì tìm id của nó để hiện ra cho người dùng xem
                })
                .catch(() => {
                    alert("Somethings went wrong!")
                })
            :
            handleDataApi(`https://gorest.co.in/public/v1/users/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer 9c729dfae96ae5c25e064bf8ee1dba789afe655a625a642e33fe4842ac3ced24"
                    }
                },
                data)
                .then((response) => {
                    console.log(response)
                    alert(`Update successfully! \n 
                      Id: ${id} has been update. \n
                      Press "OK" to see details.
                    `)
                    onSearchById(response.data.id)
                    // sửa item xong thì tìm id của nó để hiện ra cho người dùng xem
                })
                .catch((err) => {
                    alert(`Error ${err}`)
                })
    }
    //#endregion

    return (
        <div className="container container--group">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="panel panel-danger ">
                        <div className="panel-heading panel-heading--row">
                            <div className="panel-button-reload" >
                                <button
                                    title="Reload"
                                    type="button"
                                    className="btn btn-success"
                                    onClick={reload}
                                >
                                    <i class="fas fa-redo-alt"></i>
                                </button>
                            </div>
                            <h3 className="panel-title">List Test API</h3>
                            <div className="panel-button-add" >
                                <button
                                    title="AddItem"
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={onHandleAddItem}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <Search
                            onSubmit={onSearch}
                        />
                        <div className="panel-body panel-body_container panel-wraps ">
                            {
                                openReducer ? <FormInput
                                    data={dataBinding}
                                    onClose={onClose}
                                    onSubmit={onSubmit}
                                    isUpdate={isUpdateReducer}
                                /> : null
                            }
                            <div className="tableWraps">
                                <TableWraps
                                    onUpdateItem={onUpdateItem}
                                    data={response}
                                    onDeleteItem={onDeleteItem}
                                />
                                <Pagination
                                    pagination={pagination}
                                    onChangePage={onPageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Container;