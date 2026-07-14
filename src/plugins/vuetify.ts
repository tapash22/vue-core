import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";

export default createVuetify({
  icons: {
    defaultSet: "md",
    aliases,
    sets: { mdi },
  },
});
