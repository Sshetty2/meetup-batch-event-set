import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import  AutosuggestField  from "./Autosuggest";


require("./styles.css");


export default class Form extends React.Component {

  render(){


    var gnamestyle = {
      paddingTop: '10x',
      paddingBottom:'10px'
    };

    var drangestyle = {
      paddingTop: '10px'
    }

    return (
      <React.Fragment>
        <div style={gnamestyle}>
        <AutosuggestField getInputData={this.props.getInputData} textFieldValue = {this.props.textFieldValue} />
        </div>
        <div style={drangestyle}>  
        <TextField
          id="date-range"
          name="date-range"
          label="Date Range"
          fullWidth
          value={this.props.date}
          required= {false}
        />
        </div>
        <div style={{paddingTop: '20px'}}>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled= {false}
            onClick={this.props.onFormSubmit}
          >
            Schedule
          </Button>
        </div>
      </React.Fragment>
    );
   };
  }
   