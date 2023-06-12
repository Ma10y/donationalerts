class donationalerts {
  constructor(client_id, redirect_uri, scope, client_secret) {
    this.client_id = client_id;
    this.redirect_uri = redirect_uri;
    this.scope = scope;
    this.client_secret = client_secret;
  }

  authorize() {
    return `https://www.donationalerts.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}`;
  }

  async getTokens(code) {
    const url = "https://www.donationalerts.com/oauth/token";
    const data = `grant_type=authorization_code&client_id=${this.client_id}
&client_secret=${this.client_secret}&redirect_uri=${this.redirect_uri}&code=${code}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });
    const res = await response.json();
    const { access_token, refresh_token } = res;
    return { access_token, refresh_token };
  }
}

module.exports = donationalerts;
