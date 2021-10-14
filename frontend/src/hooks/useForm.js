import {useState, useCallback} from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return { formData,setFormData, handleInputChange };
};
export default useForm;
