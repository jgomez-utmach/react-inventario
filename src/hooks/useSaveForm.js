import { useState } from 'react';

const useSaveForm = (initialState, callback) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(formData);
    setFormData(initialState);
  };

  return { formData, handleInputChange, handleSubmit };
};

export default useSaveForm;
