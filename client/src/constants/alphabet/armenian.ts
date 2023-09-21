import { keyBy } from "lodash";
import { TLetter } from "types";

export const letters: TLetter[] = [
  {
    key: "a",
    value: {
      uppercase: "Ա",
      lowercase: "ա",
    },
  },
  {
    key: "b",
    value: {
      uppercase: "Բ",
      lowercase: "բ",
    },
  },
  {
    key: "g",
    value: {
      uppercase: "Գ",
      lowercase: "գ",
    },
  },
  {
    key: "d",
    value: {
      uppercase: "Դ",
      lowercase: "դ",
    },
  },
  {
    key: "y",
    value: {
      uppercase: "Ե",
      lowercase: "ե",
    },
  },
  {
    key: "z",
    value: {
      uppercase: "Զ",
      lowercase: "զ",
    },
  },
  {
    key: "e",
    value: {
      uppercase: "Է",
      lowercase: "է",
    },
  },
  {
    key: "ee",
    value: {
      uppercase: "Ը",
      lowercase: "ը",
    },
  },
  {
    key: "th",
    value: {
      uppercase: "Թ",
      lowercase: "թ",
    },
  },
  {
    key: "j",
    value: {
      uppercase: "Ժ",
      lowercase: "ժ",
    },
  },
  {
    key: "i",
    value: {
      uppercase: "Ի",
      lowercase: "ի",
    },
  },
  {
    key: "l",
    value: {
      uppercase: "Լ",
      lowercase: "լ",
    },
  },
  {
    key: "kh",
    value: {
      uppercase: "Խ",
      lowercase: "խ",
    },
  },
  {
    key: "ts",
    value: {
      uppercase: "Ծ",
      lowercase: "ծ",
    },
  },
  {
    key: "k",
    value: {
      uppercase: "Կ",
      lowercase: "կ",
    },
  },
  {
    key: "h",
    value: {
      uppercase: "Հ",
      lowercase: "հ",
    },
  },
  {
    key: "dz",
    value: {
      uppercase: "Ձ",
      lowercase: "ձ",
    },
  },
  {
    key: "gh",
    value: {
      uppercase: "Ղ",
      lowercase: "ղ",
    },
  },
  {
    key: "tsh",
    value: {
      uppercase: "Ճ",
      lowercase: "ճ",
    },
  },
  {
    key: "m",
    value: {
      uppercase: "Մ",
      lowercase: "մ",
    },
  },
  {
    key: "ye",
    value: {
      uppercase: "Յ",
      lowercase: "յ",
    },
  },
  {
    key: "n",
    value: {
      uppercase: "Ն",
      lowercase: "ն",
    },
  },
  {
    key: "sh",
    value: {
      uppercase: "Շ",
      lowercase: "շ",
    },
  },
  {
    key: "v",
    value: {
      uppercase: "Ո",
      lowercase: "ո",
    },
  },
  {
    key: "tch",
    value: {
      uppercase: "Չ",
      lowercase: "չ",
    },
  },
  {
    key: "p",
    value: {
      uppercase: "Պ",
      lowercase: "պ",
    },
  },
  {
    key: "dj",
    value: {
      uppercase: "Ջ",
      lowercase: "ջ",
    },
  },
  {
    key: "r",
    value: {
      uppercase: "Ռ",
      lowercase: "ռ",
    },
  },
  {
    key: "s",
    value: {
      uppercase: "Ս",
      lowercase: "ս",
    },
  },
  {
    key: "ve",
    value: {
      uppercase: "Վ",
      lowercase: "վ",
    },
  },
  {
    key: "t",
    value: {
      uppercase: "Տ",
      lowercase: "տ",
    },
  },
  {
    key: "ze",
    value: {
      uppercase: "Ր",
      lowercase: "ր",
    },
  },
  {
    key: "tse",
    value: {
      uppercase: "Ց",
      lowercase: "ց",
    },
  },
  {
    key: "u",
    value: {
      uppercase: "Ու",
      lowercase: "ու",
    },
  },
  {
    key: "ph",
    value: {
      uppercase: "Փ",
      lowercase: "փ",
    },
  },
  {
    key: "khe",
    value: {
      uppercase: "Ք",
      lowercase: "ք",
    },
  },
  {
    key: "yev",
    value: {
      uppercase: "Եվ",
      lowercase: "և",
    },
  },
  {
    key: "o",
    value: {
      uppercase: "Օ",
      lowercase: "օ",
    },
  },
  {
    key: "vee",
    value: {
      uppercase: "Ֆ",
      lowercase: "ֆ",
    },
  },
];

export const lettersMap = keyBy(letters, "key");
