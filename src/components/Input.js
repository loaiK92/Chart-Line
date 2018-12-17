import React from "react";

class Input extends React.Component {
  state = {
    inputValue: "" // save input value
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    // simple RegEx to check if the value is matching var001 - var200
    const regex = /(var)+[0,1]\d\d/gi;
    // test value
    const valid = regex.test(value);
    // get value length
    const inputLength = value.split("").length;

    // if the value is valid or equal "var200" and its length = 6, set this value to the state
    if (
      (valid && inputLength === 6) ||
      (value === "var200" && inputLength === 6)
    ) {
      return this.setState({ [name]: value });
    } else {
      return this.setState({ [name]: "" });
    }
  };

  render() {
    // { searchVariable } is a function which passed in props to get data from the server
    const { searchVariable } = this.props;
    // get the input value from the state
    const { inputValue } = this.state;
    return (
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          if (!inputValue)
            // if there is no value alert a message
            return alert(
              'Please enter a value exclusively with this format "var001" between " var001 ... var200 "'
            );
          searchVariable(inputValue); // call the function with inputValue as a parameter
        }}
      >
        <input
          className="inputElement"
          type="text"
          name="inputValue"
          onChange={this.handleChange} // onChange run handleChange function
          placeholder='Search for " var001 ... var200 " '
        />
        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Input;
