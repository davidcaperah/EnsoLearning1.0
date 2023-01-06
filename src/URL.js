
const server = document.domain;
let URL = "";
if(server === "localhost"){
    URL = {
        local: "http://localhost:3000/",
        compartido : "http://localhost:3000/",
        servidor : "http://localhost/api/Enso-BackEnd/",
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