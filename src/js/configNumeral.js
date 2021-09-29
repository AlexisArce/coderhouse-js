import numeral from "numeral";

export function setNumeral() {
  numeral.register("locale", "ar", {
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
  });

  numeral.locale("ar");
}
