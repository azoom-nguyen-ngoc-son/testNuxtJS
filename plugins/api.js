import ky from "Ky"


const createAPI = (baseURL) => {
    ky.create({
        prefixUrl: baseURL || "",
        timeout: 30000,
        credentials: 'include'
    }
    )
}
const useApi =  createAPI('https://jsonplaceholder.typicode.com/')
export default useApi