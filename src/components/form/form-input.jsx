import React from 'react';
import checkSpecialCharacter from '../function-logic/checkSpecialCharacter';
import LimitStringInput from '../function-logic/limitStringInput';
import CheckIllegalEmail from '../function-logic/checkInvaildEmail';


export default class FormInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: "",
            gender: 1,
            status: 1,
            isEmpty: false,
            hasSpecialKey: false,
            strLimited: false,
            emailIllegal: false,
        }
    }
    isEmptyObj = (v) => {
        return Object.keys(v).length === 0;
    };
    // kiểm tra xem object có rỗng hay là không
    // khi component render ra thì kiểm tra nó có dữ liệu gì truyền vào không
    // dữ liệu ở đây là dữ liệu từ 1 item trên table
    // nếu có thì xác định component đang trong trạng thái "sửa" và cập nhật lại các trường 
    // name, email, gender ...
    componentDidMount() {
        this.isEmptyObj(this.props.data) ?
            this.setState({
                name: '',
                email: "",
                gender: 1,
                status: 1,
            })
            :
            this.setState({
                name: this.props.data.name,
                email: this.props.data.email,
                gender: this.props.data.gender === 'male' || this.props.datagender === 'Male' ? 1 : 0,
                status: this.props.data.gender === 'active' || this.props.data.gender === 'Active' ? 1 : 0,
            })
    }



    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
            isEmpty: false,
            hasSpecialKey: false,
            strLimited: false,
            emailIllegal: false,
        });
        //    khi mà ô input có sự thay đổi 
        //    thì sẽ đưa trạng thái isEmpty và hasSpecialKey về sai
    };

    onSubmit = (e) => {
        e.preventDefault()
        // kiểm tra xem các trường này có trống hay không
        if (this.state.name === "" || this.state.email === "") {
            this.setState({
                isEmpty: true
                // nếu trống thì chuyển trạng thái của isEmpty về true
            })
        }

        else if (checkSpecialCharacter(this.state.name) || checkSpecialCharacter(this.state.email)) {
            this.setState({
                hasSpecialKey: true
            })
        }
        // Kiểm tra kí tự đặc biệt trên trường Email

        else if (LimitStringInput(this.state.email) || LimitStringInput(this.state.name)) {
            this.setState({
                strLimited: true
            })
            console.log(this.state.strLimited)
        }
        // Kiểm tra hai trường name và email có độ dài vượt quá số lượng cho phép k

        else if (!CheckIllegalEmail(this.state.email)) {
            this.setState({
                emailIllegal: true,
            })
        }
        // kiểm tra email có hợp lệ không


        else {
            e.preventDefault();
            let formData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                gender: this.state.gender === 1 ? "Male" : "Female",
                status: this.state.status === 1 ? "Active" : "InActive"
            }
            this.props.onSubmit(formData)
            this.onClose()
        }

        //    console.log({formData})
        // lấy dữ liệu luôn nha
    }
    onClose = () => {
        this.props.onClose()
        // khi hàm này được gọi thì ta sẽ set lại 
        // trạng thái cho isData và các thông tin
    }

    render() {
        return (
            <div className="overlay active">
                {/* btn cancel */}
                <button
                    alt="Close"
                    type="submit"
                    className={this.props.isUpdate ? "btn btn-success form-btn__cancel" : "btn btn-danger form-btn__cancel"}
                    onClick={this.onClose}
                >
                    <i className="fas fa-times"></i>
                </button>
                <form onSubmit={this.onSubmit} className="form-input">
                    <legend>{this.props.isUpdate ? "Update Item" : "Add a new item"}</legend>
                    <div className="form-group">
                        <label className="form-control-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id=""
                            placeholder="somebody.name..."
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            title="Name"
                        />

                        {this.state.isEmpty ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) Do not empty this field!
                            </span> :
                            null}
                        {/* kiểm tra xem trường này có trống hay không */}
                        {this.state.strLimited ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) Input filed must not have more than 30 character!
                            </span> :
                            null}

                        {/* kiểm tra xem độ dài có vượt quá số kí tự được quy định hay không */}
                    </div>

                    <div className="form-group">
                        <label className="form-control-label">Email</label>
                        {/* chỗ này sẽ show ra cái thông báo */}
                        <input
                            type="text"
                            className="form-control "
                            id=""
                            placeholder="somebody...@gmail.com"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            disabled={this.props.isUpdate}
                            title={this.props.isUpdate ? "Email is not enabled on update." : "Email"}
                        />
                        {this.state.isEmpty ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) Do not empty this field!
                            </span> :
                            null}
                        {this.state.hasSpecialKey === true ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) The special character as ! # $ % ^ & *... do not accept!
                            </span> :
                            null}
                        {this.state.strLimited ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) Input filed must not have more than 30 character!
                            </span> :
                            null}
                        {this.state.emailIllegal ?
                            <span className="form-control-label form-control-label--notice ">
                                (*) Email is illegal!
                            </span> :
                            null}
                        {/* kiểm tra xem các trường như name và email có trống hay không
                        nếu trống thì đưa ra thông báo */}
                    </div>

                    <div className="form-group">
                        <label className="form-control-label">Gender</label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.onChange}
                            title="Gender"
                        >
                            <option value={1} >Male</option>
                            <option value={0} >Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-control-label">Status</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            title="Status"
                        >
                            <option value={1} >Active</option>
                            <option value={0}>InActive</option>
                        </select>
                    </div>
                    <div className=" form-button">
                        <button type="submit"
                            className={this.props.isUpdate ? "btn btn-success" : "btn btn-danger"}
                            title={this.props.isUpdate ? "Update" : "Add"}
                        >
                            {this.props.isUpdate ? "Update" : "Add item"}</button>
                    </div>
                </form>
            </div>

        )
    }
}