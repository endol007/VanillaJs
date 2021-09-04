const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"

export const request = async (nodeId) => {
    console.log(nodeId);
    try{
        const response = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ""}`);
        if(response.status < 300) return XPathResult.json();
        else throw new Error(`Code ${response.status}: Error`);
    }catch(error){
        throw new Error(`${error.message}`)
    }
};

const api = {
    fetchRoot(){
        return request();
    },
    fetchDirectory(nodeId){
        return request(nodeId);
    }
}