import { useCssVar } from "@vueuse/core";

const themeColors = (primary, text) => {
  let wrapper = document.querySelector(".wrapper");
  const colorPrimary = useCssVar("--primary-color", wrapper);
  const colorText = useCssVar("--text-color-theme", wrapper);

  colorPrimary.value = primary;
  colorText.value = text;
};

export default themeColors;
