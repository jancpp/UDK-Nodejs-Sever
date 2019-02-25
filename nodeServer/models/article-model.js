
class Article {

    constructor( id, url, headline, author, date, main_image, body) {
        this.id = 0;
        this.url = url;
        this.headline = headline;
        this.author = author;
        this.date = date;
        this.main_image = main_image;
        this.body = body;
    }

    static getArticleById(id) {
        let sql = `SELECT * FROM ArticleS WHERE id = ${id}`;
        return sql;
    }

    static getAllArticles() {
        let sql = `SELECT * FROM ARTICLES`;
        return sql;
    }
}

export default Article;