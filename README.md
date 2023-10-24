# OCC API UTILS

## Oracle Commerce Cloud

### Why This Tool?
We've developed a user-friendly API tool for those who might not be familiar with tools like Postman, SoapUI, or Swagger. With our UI-based tool, interacting with REST APIs is as simple as a few clicks and providing input – no technical expertise required.

### What Does This Tool Do?
This tool is designed to facilitate interactions with Oracle Commerce Cloud APIs.

### What all API's are available?
1. Import
2. Export
3. Organizations
4. Profiles
5. Deployment
6. Merchant settings
7. Files
8. Search - Under construction

### How It Works
To begin, this tool is built using the popular Next.js framework, which is based on the React library. To run this app on your local system, ensure you have the following software installed:

1. Node.js (LTS version)
2. Git (to clone this repository to your local system)
3. Visual Studio Code (optional but preferred for code editing)

Once you've cloned this repository to your local system using Git, open the directory where the app is located. If you're using Visual Studio Code, you'll find a terminal option in the top navigation bar. Click on it to open a terminal.

Now it's time to run a set of commands in the terminal to start this app. Please follow the listed commands in the specified order:

```bash
npm install -g yarn   # Install the Yarn package globally.
yarn install          # Install all required node modules.
yarn dev              # Start the development server.
```

Additinal commands
```bash
yarn build  # Use this command to create a production build.
yarn start  # If you need to serve the build, use this command.
```

### How do I use the app?

* When you open the app, it will ask you to provide an instance ID (ex: p12345678dev) and an app key (ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OD...).
* After providing these two details, you can click on the login. 
* Once the login is successful, on the left side, you will get to see a certain set of icons, those are actually individual API services.
* By clicking on any option, you will be landed on that API-related page, where you can perform actions related to that particular API.

Note: We are not saving the app key and instance ID anywhere. Neither in session nor in local storage, so if you refresh the page manually, then everything will be lost, and again, you have to do a login.
  
### More detailed usage of the app
Those details will be added soon.
