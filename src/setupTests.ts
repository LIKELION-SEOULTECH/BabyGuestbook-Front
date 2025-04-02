import "@testing-library/jest-dom";

if (typeof ResizeObserver === "undefined") {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}
