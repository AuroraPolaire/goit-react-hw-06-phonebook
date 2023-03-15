import { Table } from './Contacts.styled';
import { useDispatch } from 'react-redux/es/exports';
import { deleteContact } from 'redux/contactsSlice';
import { getContactsList, getFilter } from 'redux/selectors';
import { useSelector } from 'react-redux/es/exports';

export const Contacts = () => {
  const dispatch = useDispatch();

  const contactsList = useSelector(getContactsList);
  const filterQuery = useSelector(getFilter);

  const normalizedFilter = filterQuery.toLowerCase();
  const filteredContacts = contactsList.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };

  return (
    <Table>
      <tbody>
        {filteredContacts.map(({ id, name, number }) => {
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{number}</td>
              <td>
                <button onClick={() => deleteContacts(id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
