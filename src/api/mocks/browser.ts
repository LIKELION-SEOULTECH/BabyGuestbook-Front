import { setupWorker } from "msw/browser";
import { postHandlers } from "./postHandler";
import { commentHandlers } from "./commentHandler";
import { likeHandlers } from "./likeHandler";

export const worker = setupWorker(
    ...postHandlers,
    ...commentHandlers,
    ...likeHandlers
);
