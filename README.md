# Gotham City Bank Web App ![Gotham City Bank][gcb-img]

This is a bank app designed for the [MITxPro Professional Certificate in Coding: Full Stack Development with MERN](https://xpro.mit.edu/programs/program-v1:xPRO+PCCx+R1/). It allows you to create and edit bank accounts and make deposits and withdrawals. 

## How to use

Execute [`gh repo clone richardsonchrisj/gcbank`] with [npm](https://docs.npmjs.com/cli/init) to clone the code:

## Configuration

### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Create the `.env.local` in the main directory (which will be ignored by Git):

Then set each variable on `.env.local`:

- `MONGODB_URI=` should be the MongoDB connection string you got from step 1.
- `GITHUB_ID=` **\*\***\*\*\*\***\*\***
- `GITHUB_SECRET=` **\*\***\*\*\*\***\*\***
- `TWITTER_ID=` **\*\***\*\*\*\***\*\***
- `TWITTER_SECRET=` **\*\***\*\*\*\***\*\***
- `AUTH0_CLIENT_ID=` **\*\***\*\*\*\***\*\***
- `AUTH0_CLIENT_SECRET=` **\*\***\*\*\*\***\*\***
- `AUTH0_DOMAIN=` **\*\***\*\*\*\***\*\***
- `NEXTAUTH_URL=` http://localhost:3000 for local testing

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import/git?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose&project-name=with-mongodb-mongoose&repository-name=with-mongodb-mongoose&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB&envLink=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose%23step-2-set-up-environment-variables)

## Credits

The web app uses the following packages:

- [bootstrap](https://getbootstrap.com/)
- [mongoose](https://mongoosejs.com/)
- [next](https://nextjs.org/)
- [next-auth] (https://next-auth.js.org/)
- [react](https://reactjs.org/)
- [react-bootstrap](https://getbootstrap.com/)
- [swr] (https://swr.vercel.app/)


[gcb-img]: https://github.com/richardsonchrisj/gcbank/blob/main/public/images/BTAS.png
