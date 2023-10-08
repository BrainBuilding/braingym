import { keyBy } from "lodash";
import { TLetter } from "shared/types";

export const letters: TLetter[] = [
  {
    key: "a",
    value: {
      uppercase: "Ա",
      lowercase: "ա",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "b",
    value: {
      uppercase: "Բ",
      lowercase: "բ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "g",
    value: {
      uppercase: "Գ",
      lowercase: "գ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "d",
    value: {
      uppercase: "Դ",
      lowercase: "դ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "y",
    value: {
      uppercase: "Ե",
      lowercase: "ե",
    },
    isVowel: true,
    hasOneSound: false,
  },
  {
    key: "z",
    value: {
      uppercase: "Զ",
      lowercase: "զ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "e",
    value: {
      uppercase: "Է",
      lowercase: "է",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "ee",
    value: {
      uppercase: "Ը",
      lowercase: "ը",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "th",
    value: {
      uppercase: "Թ",
      lowercase: "թ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "j",
    value: {
      uppercase: "Ժ",
      lowercase: "ժ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "i",
    value: {
      uppercase: "Ի",
      lowercase: "ի",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "l",
    value: {
      uppercase: "Լ",
      lowercase: "լ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "kh",
    value: {
      uppercase: "Խ",
      lowercase: "խ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "ts",
    value: {
      uppercase: "Ծ",
      lowercase: "ծ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "k",
    value: {
      uppercase: "Կ",
      lowercase: "կ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "h",
    value: {
      uppercase: "Հ",
      lowercase: "հ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "dz",
    value: {
      uppercase: "Ձ",
      lowercase: "ձ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "gh",
    value: {
      uppercase: "Ղ",
      lowercase: "ղ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "tsh",
    value: {
      uppercase: "Ճ",
      lowercase: "ճ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "m",
    value: {
      uppercase: "Մ",
      lowercase: "մ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "ye",
    value: {
      uppercase: "Յ",
      lowercase: "յ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "n",
    value: {
      uppercase: "Ն",
      lowercase: "ն",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "sh",
    value: {
      uppercase: "Շ",
      lowercase: "շ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "v",
    value: {
      uppercase: "Ո",
      lowercase: "ո",
    },
    isVowel: true,
    hasOneSound: false,
  },
  {
    key: "tch",
    value: {
      uppercase: "Չ",
      lowercase: "չ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "p",
    value: {
      uppercase: "Պ",
      lowercase: "պ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "dj",
    value: {
      uppercase: "Ջ",
      lowercase: "ջ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "r",
    value: {
      uppercase: "Ռ",
      lowercase: "ռ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "s",
    value: {
      uppercase: "Ս",
      lowercase: "ս",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "ve",
    value: {
      uppercase: "Վ",
      lowercase: "վ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "t",
    value: {
      uppercase: "Տ",
      lowercase: "տ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "ze",
    value: {
      uppercase: "Ր",
      lowercase: "ր",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "tse",
    value: {
      uppercase: "Ց",
      lowercase: "ց",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "u",
    value: {
      uppercase: "Ու",
      lowercase: "ու",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "ph",
    value: {
      uppercase: "Փ",
      lowercase: "փ",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "khe",
    value: {
      uppercase: "Ք",
      lowercase: "ք",
    },
    isVowel: false,
    hasOneSound: true,
  },
  {
    key: "yev",
    value: {
      uppercase: "Եվ",
      lowercase: "և",
    },
    isVowel: false,
    hasOneSound: false,
  },
  {
    key: "o",
    value: {
      uppercase: "Օ",
      lowercase: "օ",
    },
    isVowel: true,
    hasOneSound: true,
  },
  {
    key: "vee",
    value: {
      uppercase: "Ֆ",
      lowercase: "ֆ",
    },
    isVowel: false,
    hasOneSound: true,
  },
];

export const lettersMap = keyBy(letters, "key");
