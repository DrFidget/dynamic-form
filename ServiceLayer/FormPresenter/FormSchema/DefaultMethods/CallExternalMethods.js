import { externalMethods } from "../../../../src/ExternalMethods/ExternalMethods";
import { getExternalTypes } from "./externalTypes";

export const callExternalMethods = (kv) => {
  let type = getExternalTypes(kv);
  if (kv.includes(type)) {
    let split = kv.split(type);
    return externalMethods[split[0] + type](kv);
  }
  return kv;
};
