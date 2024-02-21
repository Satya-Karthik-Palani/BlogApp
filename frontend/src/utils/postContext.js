const { createContext } = require("react");

const postContext = createContext({
    post: [],
    currpost:[],
})

export default postContext;