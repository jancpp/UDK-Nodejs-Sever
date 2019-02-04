// FetchArticles.js

export const getArticles = (number) => {
    let article_num = number;
    // const URL = "http://104.248.235.9:3000/api/${article_num}";
    const URL = "http://10.104.135.50:3000/api/${article_num}"; //use ifconfig for your ip
    return fetch(URL)
            .then((res) => res.json());
}
