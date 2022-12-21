# Auto Perf Review

Take the drudgery out of performance reviews!

## Setup

You need `npm`. Then `create-react-app`, and `wrangler` globally installed.

## Local Development

Use `wrangler pages dev -- npm start` to start a local development instance.\
You need to go to `http://127.0.0.1:3000/` to see the page. Don't use the `[b]`
wrangler command, because it's borked. But after that you have auto-reload and all
development goodies for both the SPA and `function` side.

Ports `3000` and `8788` hold special significance for the system. 

### Troubleshooting

Ports `3000` or `8788` might be in use. Sometimes because of a previous crash of the
process. Compilation errors in the React part might get `wrangler` in a borked state and it
needs to be restarted. But it might leave various subprocesses still running, which prevents
a clean restart. Use `netstat -vanp tcp | grep 3000` and `netstat -vanp tcp | grep 8788` to
identify hanging processes and `kill` them.

## Contribution

Use `npm test` to test everything and `npm run format` to auto-format code before a check.

## Environment

Write your own `.env.local` file at the root with the appropriate variables.

## Available Scripts

In the project directory, you can run:

### `wrangler pages dev -- npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

It doesn't do anything around Cloudflare pages functions. That's up to the
Cloudflare infra to package.

### `npm run format`

Format the whole source tree according to non-negociable Prettier rules.
