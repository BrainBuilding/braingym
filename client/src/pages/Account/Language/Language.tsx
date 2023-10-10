import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import { localStore } from "utils";
import { LanguageStyled } from "./Language.styles";

export const Language = () => {
  const [language, setLanguage] = useState(
    localStore.getData("language") || "hy"
  );
  const { t, i18n } = useTranslation();

  const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStore.setData("language", event.target.value);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <LanguageStyled>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          {t("language")}
        </FormLabel>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="hy"
            control={
              <Radio
                checked={language === "hy"}
                value="hy"
                onChange={onLanguageChange}
              />
            }
            label="Հայերեն"
          />

          <FormControlLabel
            value="en"
            control={
              <Radio
                checked={language === "en"}
                value="en"
                onChange={onLanguageChange}
              />
            }
            label="English"
          />
        </RadioGroup>
      </FormControl>
    </LanguageStyled>
  );
};
