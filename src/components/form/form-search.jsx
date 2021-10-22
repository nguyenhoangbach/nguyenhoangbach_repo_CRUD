import React from "react";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            isNumber: true,
        }
    }

    onChange = (e) => {
        this.setState({
            data: e.target.value,
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.data)
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit} >
                    <div className="form-group search-form">
                        <input
                            onClick={this.onInputClick}
                            name=""
                            value={this.state.id}
                            onChange={this.onChange}
                            placeholder="Enter st to search..."
                        />
                        <button type="submit"
                            className="btn btn-danger"
                            title="Enter to search">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
