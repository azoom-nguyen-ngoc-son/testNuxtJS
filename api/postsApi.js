import { useAPI } from "../plugins/api";

export const getPosts = () => {
        console.log("aip posts", useAPI.get("posts").json());
        return useAPI.get("posts").json()
    }
