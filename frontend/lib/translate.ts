import { englishMessage } from "@/lang/en";
import { TranslateKey } from "@/types/common";

export const handleTranslate = (key: TranslateKey, lang = "en") => {
  if (lang === "en") {
    const val = englishMessage[key];
    if (val) {
      return val;
    }
    return key;
  }
  return key;
};
