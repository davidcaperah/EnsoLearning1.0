
const server = document.domain;
let URL = "";
console.log(server);
if(server === "localhost"){
    URL = {
        local: "http://localhost:3000/",
        compartido : "http://localhost:3000/",
        servidor : "http://localhost/api/EnsoLearningBackend/",
        servidordos : "http://localhost/"
    };
}else{
    URL = {
    local: "https://enso-learning.com.co/",
    compartido : "https://enso-learning.com.co/",
    servidor : "https://enso-learning.com.co/api/EnsoLearningBackend/",
    servidordos : "https://enso-learning.com.co/"
};
}



export default URL;