/*global chrome*/
import React from "react";
import Autosuggest, { AutosuggestProps } from "react-autosuggest";
import TextField from "@material-ui/core/TextField";
import "./css/index.css";

interface AutosuggestState {
	value: string;
	suggestions: Array<string>;
	grpNameArray: Array<string>;
}
interface AutosuggestPropsInterface {
	getInputData: Function;
	textFieldValue: string;
}
export default class AutosuggestField extends React.Component<AutosuggestPropsInterface, AutosuggestState> {
	constructor(props: AutosuggestPropsInterface) {
		super(props);
		this.state = {
			value: "",
			suggestions: [],
			grpNameArray: []
		};
	}

	getSuggestions = (x: string) => {
		// gets suggestions array from chrome local storage after it has been set in the content script which was initiated through a message from the background script when a tab is updated
		chrome.storage.local.get(["grpNameArray"], result => {
			if (result.grpNameArray) {
				this.setState({
					grpNameArray: result.grpNameArray
				});
			}
		});
		const inputValue = x.trim().toLowerCase();
		const inputLength = inputValue.length;
		try {
			return inputLength === 0
				? []
				: this.state.grpNameArray.filter(
					group =>
						group[1].toLowerCase().slice(0, inputLength) ===
						inputValue.toLowerCase()
				);
		} catch (err) {
			return [];
		}
	};

	getSuggestionValue = (suggestion: any) => suggestion[1];

	renderInputComponent = (inputProps: any) => (
		<TextField
			id='group-name'
			name='group-name'
			label='Group Name'
			value={this.props.textFieldValue}
			fullWidth
			{...inputProps}
			refCallback={inputProps.ref}
			ref={null}
		/>
	);

	renderSuggestion = (suggestion: any) => (
		<span className='open-sans'>{suggestion[1]}</span>
	);

	onChange = (event: any, { newValue }: any) => {
		this.setState({
			value: newValue
		});
		this.props.getInputData(newValue);
	};

	onSuggestionsFetchRequested = ({ value }: any) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		// console.log(`the value of this.props.value on the autosuggest component is ${this.state.grpNameArray[1][1]}`)
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: this.props.textFieldValue
				? this.props.textFieldValue
				: "Type A Group Name",
			value: this.props.textFieldValue ? this.props.textFieldValue : "",
			onChange: this.onChange
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
				renderInputComponent={this.renderInputComponent}
			/>
		);
	}
}
