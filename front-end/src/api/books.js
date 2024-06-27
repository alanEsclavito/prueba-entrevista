import API from "./index.js";

const getBooks = () => API({
    url: "/books",
    method: "GET",
});

const getInventory = () => API({
    url: "/inventory",
    method: "GET",
});

export { getBooks, getInventory }
