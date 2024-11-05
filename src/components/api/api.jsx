class Api {
    static baseUrl = "https://api.domainsdb.info/v1/domains/search?domain=";

    static getUrl(domain) {
        return `${this.baseUrl}${domain}`;
    }
}

export default Api;
