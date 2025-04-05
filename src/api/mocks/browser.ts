import { setupWorker } from "msw/browser";
import { postHandlers } from "./postHandler";
import { commentHandlers } from "./commentHandler";

export const worker = setupWorker(
    ...postHandlers,
    ...commentHandlers
);
