const var_now = () => {
  return new Date().toISOString().slice(0, 10);
};
const var_uname = () => {
  return "user";
};
const var_umobile = () => {
  return "0000-0000000";
};
const var_clat = () => {
  return "latitude";
};
const var_clong = () => {
  return "longitude";
};

export const DefaultMethods = {
  "#VAR_NOW#": var_now,
  "#VAR_UNAME#": var_uname,
  "#VAR_UMOBILE#": var_umobile,
  "#VAR_CLAT#": var_clat,
  "#VAR_CLONG#": var_clong,
};
