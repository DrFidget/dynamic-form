const var_then = () => {
  return new Date().toISOString().slice(0, 10);
};

export const InternalDefaultfunctions = {
  "#VAR_THEN#": var_then,
};
