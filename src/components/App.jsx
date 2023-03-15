import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useDispatch } from 'react-redux/es/exports';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { filterContacts } from 'redux/filterSlice';
import { useSelector } from 'react-redux/es/exports';
import { getContactsList, getFilter } from 'redux/selectors';

import PropTypes from 'prop-types';

export const App = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContactsList);
  const filterQuery = useSelector(getFilter);

  const updateContacts = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const contactExists = contactsList.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : dispatch(addContact(contact));
  };

  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };

  const normalizedFilter = filterQuery.toLowerCase();
  const filteredContacts = contactsList.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={updateContacts} />
      </Section>
      <Section title="Contacts">
        <Filter filter={e => dispatch(filterContacts(e.target.value))} />
        <Contacts
          contactList={filteredContacts}
          deleteContact={deleteContacts}
        />
      </Section>
    </>
  );
};

App.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};
