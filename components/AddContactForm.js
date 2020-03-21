import React, {Component} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 28,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default class AddContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: '',
    phone: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name != prevState.name ||
      this.state.phone != prevState.phone
    ) {
      this.validateForm();
    }
  }

  handleNameChange = name => {
    this.setState({name}, this.validateForm);
  };

  handlePhoneChange = phone => {
    this.setState({phone}, this.validateForm);
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      this.props.onSubmit({...this.state});
    }
  };

  validateForm = () => {
    const {phone, name} = this.state;
    if (+phone >= 0 && phone.length <= 10 && name.length >= 3) {
      this.setState({isFormValid: true});
    } else {
      this.setState({isFormValid: false});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.handleNameChange}
          style={styles.input}
          value={this.state.name}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={this.handlePhoneChange}
          style={styles.input}
          value={this.state.phone}
          placeholder="Phone"
        />
        <Button title="Add Contact" disabled={!this.state.isFormValid} />
      </View>
    );
  }
}
