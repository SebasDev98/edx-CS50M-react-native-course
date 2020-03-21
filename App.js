import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import contacts, {compareNames} from './contacts';
import ContactsList from './components/ContactsList';
import AddContactForm from './components/AddContactForm';
export default class App extends Component {
  state = {
    showContacts: true,
    showForm: false,
    contacts: contacts,
    showForm: false,
  };

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}));
  };

  showForm = () => {
    this.setState(prevState => ({showForm: !prevState.showForm}));
  };

  sort = () => {
    this.setState(prevState => ({
      contacts: prevState.contacts.sort(compareNames),
    }));
  };

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      showForm: false,
    }));
  };

  render() {
    if (this.state.showForm)
      return <AddContactForm onSubmit={this.addContact} />;
    return (
      <NavigationContainer>
        {' '}
        <View style={styles.container}>
          <Button title="toggle contacts" onPress={this.toggleContacts} />
          <Button title="add contact" onPress={this.showForm} />
          {this.state.showContacts && (
            <ContactsList contacts={this.state.contacts} />
          )}
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
