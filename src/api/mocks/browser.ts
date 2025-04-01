import { setupWorker } from "msw/browser";
import { postHandlers } from "./postHandler";

export const worker = setupWorker(...postHandlers);
