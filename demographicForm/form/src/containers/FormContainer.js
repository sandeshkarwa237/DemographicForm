import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName:"",
			lastName:"",
			gender:[],
			genderSelected:"",
			phoneNumber:"",
			address:"",
			errorList:[]
		};
		this.handleFieldChange=this.handleFieldChange.bind(this);
		this.handleFormSubmit=this.handleFormSubmit.bind(this);
	}
	componentDidMount = () => {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					firstName:data.firstName,
					lastName:data.lastName,
					gender:data.gender,
					genderSelected:'',
					phoneNumber:data.phoneNumber,
					address:data.address
				});
			});
	}

	handleFieldChange = (event) => {
		const value =event.target.value;
        const name =event.target.name;
        this.setState({[name]: value});
	}

	handleFormSubmit = (event) =>{
		event.preventDefault();
		const that=this;
		const arrOfFields=Object.keys(this.state);
		this.state.errorList=arrOfFields.filter(function(data){
			return that.state[data]==='';
		})
		if(this.state.errorList.length<=5){
			that.setState({errorList:this.state.errorList});
			return null;
		}
		const detailObj={
			fname:this.state.firstName,
			lname:this.state.lastName,
			gender:this.state.genderSelected,
			phoneNumber:this.state.phoneNumber,
			address:this.state.address
		}
		console.log(detailObj);
		this.handleClearForm();
	}

	handleClearForm = ()=>{
		this.setState({firstName:'',lastName:'',genderSelected:'',phoneNumber:'',address:''});
	}

	render() {
		const errorMsg=this.state.errorList.map(function(data){
			return <div className="errorMessages">{data} is required.</div>
		});
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h4><b>Demographic details</b></h4>
				{errorMsg}
				<SingleInput inputType={'text'} title={"First Name"} name={"firstName"} content={this.state.firstName} controlFunc={this.handleFieldChange} />
				<SingleInput inputType={'text'} title={"Last Name"} name={"lastName"} content={this.state.lastName} controlFunc={this.handleFieldChange} />
				<CheckboxOrRadioGroup title={'Gender'} type={"radio"} setName={"genderSelected"} selectedOptions={this.state.genderSelected} options={this.state.gender} controlFunc={this.handleFieldChange}/>
				<SingleInput inputType={'number'} title={"Phone Number"} name={"phoneNumber"} content={this.state.phoneNumber} controlFunc={this.handleFieldChange} />
				<TextArea title={'Permanent Address'} rows={5} name={"address"} content={this.state.address} resize={false} controlFunc={this.handleFieldChange}/>
				<input
					type="submit"
					className="btn float-right btn-lg btn-block"
					value="Submit"/>
				<button
					className="btn btn-link float-left btn-lg"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
