import { useState, ChangeEvent, FormEvent } from "react";
import isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";
import { UserAuth } from "context/AuthContext";
import { TUser } from "shared/types";
import { api } from "api";

type TFormData = TUser;

export const AccountForm = () => {
  const { user, setUser } = UserAuth();
  const [formData, setFormData] = useState<TFormData>({
    ...(user as TUser),
  });

  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.put("profiles", {
      profile: formData,
      uid: user?.authUid,
    });

    setUser(formData);
  };

  const validate = () => {
    const isValid = !!(
      formData.first_name &&
      formData.last_name &&
      formData.email &&
      formData.age &&
      formData.school &&
      formData.country &&
      formData.city
    );

    return isValid;
  };

  const checkFormChanges = () => {
    return !isEqual(formData, user);
  };

  const isValid = validate();
  const isFormChanged = checkFormChanges();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder={t("firstName")}
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder={t("lastName")}
          name="last_name"
          value={formData.last_name}
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
          type="text"
          placeholder={t("country")}
          name="country"
          value={formData.country}
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

      <button disabled={!isValid || !isFormChanged} type="submit">
        {t("save")}
      </button>
    </form>
  );
};
