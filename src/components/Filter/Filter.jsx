import { useDispatch } from 'react-redux/es/exports';
import { filterContacts } from 'redux/filterSlice';
import { FormStyled } from './Form.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <FormStyled>
      <label>
        Find contacts by name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={e => dispatch(filterContacts(e.target.value))}
        ></input>
      </label>
    </FormStyled>
  );
};
