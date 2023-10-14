import isEqual from 'lodash/isEqual';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type TFormData = {
  firstName: string;
  lastName: string;
  age: string | number;
  school: string;
  city: string;
  email: string;
}

const initalData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  school: '',
  city: '',
}

export const AccountForm = () => {
  const [formData, setFormData] = useState<TFormData>({
    ...initalData
  });

  const { t } = useTranslation()



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
  };

  const validate = () => {
    const isValid = !!(
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.age &&
      formData.school &&
      formData.city
    )

    return isValid
  }

  const checkFormChanges = () => {
    return !isEqual(formData, initalData)
  }

  const isValid = validate();
  const isFormChanged = checkFormChanges();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder={t("firstName")}
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder={t("lastName")}
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder={t("age")}
          min={0}
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder={t("school")}
          name="school"
          value={formData.school}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder={t("city")}
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder={t("email")}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <button disabled={!isValid || !isFormChanged} type="submit">{t("save")}</button>
    </form>
  );
};
