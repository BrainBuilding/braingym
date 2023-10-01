import { useEffect, useState } from "react";
import { EmojiStyled } from "./Emoji.styles";

export let showEmoji: React.Dispatch<React.SetStateAction<string | null>>;
let timeoutRef: NodeJS.Timeout;

export const Emoji = () => {
  const [emoji, setEmoji] = useState<string | null>(null);

  useEffect(() => {
    showEmoji = setEmoji;
  }, []);

  useEffect(() => {
    if (emoji) {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }

      timeoutRef = setTimeout(() => {
        setEmoji(null);
      }, 1000);
    }
  }, [emoji]);

  return <EmojiStyled>{emoji}</EmojiStyled>;
};
