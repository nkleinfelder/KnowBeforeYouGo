import { getPayload } from "payload";
import config from "@payload-config";

export function getConfiguredPayload() {
  return getPayload({ config });
}
