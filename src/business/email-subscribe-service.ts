import queryString from "query-string";

export class EmailSubscribeService {
  mailchimpU: string;
  mailchimpId: string;

  constructor(mailchimpU: string, mailchimpId: string) {
    this.mailchimpU = mailchimpU;
    this.mailchimpId = mailchimpId;
  }

  async subscribe(email: string): Promise<boolean> {
    const formData = { EMAIL: email };
    const query = queryString.stringify(formData);
    const url = `https://deepreview.us11.list-manage.com/subscribe/post-json?u=${this.mailchimpU}&c=?&id=${this.mailchimpId}&${query}`;

    try {
      const response = await fetch(url, { method: "post", mode: "no-cors" });

      if (response.ok) {
        return true;
      } else {
        const text = await response.text();
        console.log(
          `Subscribe server error ${response.status} ${response.statusText} ${text}`
        );
        return false;
      }
    } catch (e) {
      console.log(`Subscribe fetch error ${e}`);
      return false;
    }
  }
  //
  // return new Promise((resolve) => {
  //   jsonp(url, options, (err, data) => {
  //     if (err) {
  //       resolve(false);
  //       return;
  //     }
  //
  //     const result = data as Response;
  //
  //     if (!result) {
  //       resolve(false);
  //       return;
  //     }
  //
  //     resolve(result.result === Result.SUCCESS);
  //   })
}
