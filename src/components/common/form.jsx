import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    console.log(this.state);
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validation = () => {
    const option = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleChange = ({ currentTarget: input }) => {
    //find error for single single inputt
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name]; //

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    this.setState({ errors: errors || {} }); //yaha else null ha... errror alway aik objct hna chhye
    if (errors) return;
    this.doSubmit();
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validation()} className="btn btn-secondary ">
        {label}
      </button>
    );
  };
  renderSelect(name, label, options) {
    console.log(this.state);
    const { data, errors } = this.state;
    return (
      <Select
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      ></Select>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      ></Input>
    );
  }
}

export default Form;
