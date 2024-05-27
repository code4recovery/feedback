# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

## Environment variables

Create a `.env` file with:

```
DATABASE_URL="mongodb+srv://mongodb:<password>@<cluster>.<subdomain>.mongodb.net/<database>?retryWrites=true&w=majority"
SENDGRID_API_KEY="<sendgrid.api.key>"
SENDGRID_SENDER="<sendgrid.verified.email.address>"
SESSION_SECRET="<make.up.a.cryptographic.salt>"
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
