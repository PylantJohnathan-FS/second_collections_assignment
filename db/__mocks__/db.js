const connect = async () => {
    console.log("MOCK connection");
};

const savePost = async (newPost) => {
    console.log("Saving MOCK posts");
    return Promise.resolve({
        year:"2007",
        make: "Triumph",
        model: "Bonneville",
    });
};

const disconnect = async () => {
    console.log("MongoDB MOCK disconnection")
};

module.exports = {connect, savePost, disconnect };