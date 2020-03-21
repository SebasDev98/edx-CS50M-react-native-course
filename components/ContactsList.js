import React from 'react';
import {SectionList, Text} from 'react-native';
import Row from './Row';

const renderSectionHeader = obj => <Text>{obj.section.title}</Text>;

const renderItem = obj => <Row name={obj.item.name} phone={obj.item.phone} />;

const ContactsList = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    };
  }, {});

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map(letter => ({
      data: contactsByLetter[letter],
      title: letter,
    }));

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
    />
  );
};

export default ContactsList;
