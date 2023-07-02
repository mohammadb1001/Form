import React from "react";
import "./App.css";
import img from "./images/form-right.png";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  FormHelperText,
} from "@mui/material";

const countries = [
  { value: "india", label: "INDIA" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  // Add more countries here...
];

const hobbies = [
  "Reading",
  "Writing",
  "Sports",
  "Music",
  // Add more hobbies here...
];

const initialValues = {
  name: "",
  address: "",
  country: "",
  gender: "",
  interests: [],
};

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (values.name.length <= 4) {
    errors.name = "name should of minimum 5 characters";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.country) {
    errors.country = "Required";
  }

  if (!values.gender) {
    errors.gender = "Required";
  }

  if (values.interests.length === 0) {
    errors.interests = "Required";
  }

  return errors;
};

const Form = () => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
      // You can perform additional actions here, such as making an API call to submit the form data.
    },
  });

  return (
    <div className="root">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="heading"> Registration Form </h3>
        <TextField
          className="text"
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          className="text"
          multiline
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <FormControl
          className="text"
          error={formik.touched.country && Boolean(formik.errors.country)}
        >
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.country && formik.errors.country && (
            <FormHelperText>{formik.errors.country}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          className="text"
          component="fieldset"
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <FormLabel component="legend" style={{marginLeft : '20px'}} >Gender</FormLabel>
          <RadioGroup
          // className="text"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{flexDirection : 'row',marginLeft : '20px'}}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              // style={{width : '40%'}}
            />
          </RadioGroup>
          {formik.touched.gender && formik.errors.gender && (
            <FormHelperText>{formik.errors.gender}</FormHelperText>
          )}
        </FormControl>

        <FormControl
        className="text"
          fullWidth
          error={formik.touched.interests && Boolean(formik.errors.interests)}
        >
          <InputLabel id="interests-label" >Interests</InputLabel>
          <Select
            labelId="interests-label"
            id="interests"
            name="interests"
            multiple
            value={formik.values.interests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            renderValue={(selected) => selected.join(", ")}
          >
            {hobbies.map((hobby) => (
              <MenuItem key={hobby} value={hobby}>
                <Checkbox checked={formik.values.interests.includes(hobby)} />
                <ListItemText primary={hobby} />
              </MenuItem>
            ))}
          </Select>
          {formik.touched.interests && formik.errors.interests && (
            <FormHelperText>{formik.errors.interests}</FormHelperText>
          )}
        </FormControl>

        <Button color="primary" variant="contained" fullWidth type="submit" style={{width : '60%',marginLeft : '7.92vw',marginBottom : '10px'}} >
          Submit
        </Button>
      </form>
      <img src={img} alt="img" className="form-right" />
    </div>
  );
};

export default Form;
