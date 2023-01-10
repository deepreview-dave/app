import jsonp from "jsonp";
import queryString from "query-string";

enum Result {
  SUCCESS = "success",
  ERROR = "error",
}

type Response = {
  result: Result;
  msg: string;
};

export class EmailSubscribeService {
  async subscribe(email: string): Promise<boolean> {
    const u = process.env.REACT_APP_MAILCHIMP_U;
    const id = process.env.REACT_APP_MAILCHIMP_ID;
    const formData = { EMAIL: email };
    const query = queryString.stringify(formData);
    const url = `https://deepreview.us11.list-manage.com/subscribe/post-json?u=${u}&id=${id}&${query}`;
    const options = { param: "c" };

    return new Promise((resolve) => {
      jsonp(url, options, (err, data) => {
        if (err) {
          resolve(false);
          return;
        }

        const result = data as Response;

        if (!result) {
          resolve(false);
          return;
        }

        resolve(result.result === Result.SUCCESS);
      });
    });
  }
}
