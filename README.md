# Walter Frontend

The frontend codebase for [Walter](https://walterai.dev), the AI financial advisor that sends subscribers curated portfolio email updates daily.

Walter aims to help recreational investors have another tool in their toolbox to monitor their portfolio's performance. Walter gathers the latest market data to provide key insights and summaries specifically tailored to the given portfolio. This ensures only the most relevant information is sent to your inbox.

Sign up for [Walter's](https://walterai.dev) free newsletter today!

### Architecture

[Walter](https://walterai.dev) is a [React](https://react.dev/) app hosted by [AWS Amplify](https://aws.amazon.com/amplify/).

The frontend makes requests to the backend hosted by [API Gateway](https://aws.amazon.com/api-gateway/) proxies the requests to different lambda functions to serve the respective API.

![Walter](https://github.com/user-attachments/assets/d56310be-c453-4183-b52c-a8c64416bc3e)
