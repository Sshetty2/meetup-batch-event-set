import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";





export const Form = props => {
    const {
      values: { name, email, password, confirmPassword },
      errors,
      touched,
      handleChange,
      isValid,
      setFieldTouched
    } = props;
   
    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };
    return (
      <form
        onSubmit={() => {
          alert("submitted");
        }}
      >
        <TextField
          id="group-name"
          name="group-name"
          helperText={touched.name ? errors.name : ""}
          error={touched.name && Boolean(errors.name)}
          label="Group Name"
          value={name}
          onChange={change.bind(null, "name")}
          fullWidth
   
        />
        <TextField
          id="date-range"
          name="date-range"
          helperText={touched.email ? errors.email : ""}
          error={touched.email && Boolean(errors.email)}
          label="Date Range"
          fullWidth
          value={email}
          onChange={change.bind(null, "email")}
   
        />
        <div style={{paddingTop: '20px'}}>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled={!isValid}
          >
            Submit
          </Button>
        </div>
      </form>
    );
   };
   