# ihelp
A web application to help people locate COVID related help as fast as possible.

## Table of Contents  
[Headers](##teckStack)  
[File Structure](#fileStructure)
[Contributing to the Project](#contributing)

## Current Tech Stack
* Frontend: React
* Backend
  * AWS Amplify
  * AWS DynamoDB

## File Structure
```
.
├── hospital-locator (the app)
│ ├── amplify (backend)
│ ├── src
│ │ ├── **__mocks__**: mock data for rapid development and testing
| | ├── AdminDb: Fetching hospital data from DynamoDB
| | ├── graphql: GraphQL scheme
| | ├── Header: Header component houses main heading and displays LocationWidget
| | ├── HomePage: Main page component composes all other current components
| | ├── HospitalList: Shows the ul of sorted hospitals, including distance and num beds
| | ├── Location: Get location of user and display it
| | ├── SearchBar: Allow user to search for a city by name
| | ├── utils: Place for utils and hooks usable across components
│ ├── apiKeys: Place where you need to put in your Google API key for testing
│ ├── App.css: Main global styles
│ ├── App.js: Main component
│ └── .eslintignore
│ └── package-lock.json
│ └── package.json: Includes eslint setup
```

## Contributing to the Project
Thanks for helping out! Here are some tips to get started:

* Fork this repo and submit PRs
* If you have trouble getting the app to start, make sure that you have `cd`ed into the `hospital-locator` folder. If you still have trouble, try deleting `package-lock.json` and/or checking that you are using Node v14 or above
* We want to keep track of tasks. Use the tasks channel in the Discord server:
 * `-task list`: List all current tasks
 * `-task help`: Get help with the task command
 * `-task add dev "my task"`: Add a task to the task list
 * `-task done task-id`: Mark a task as done in the task list

### Google Maps API

* This project uses the Google Maps API
* You will need to put your Google Maps API Key in `apiKeys.js`

### More about Amplify
Some more useful details about Amplify:

1. Frontend: [Amplify supports React framework](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/?e=gs2020&p=build-a-react-app-intro) and therefore we setup up ampify in our react app. We have already created an Amplify app in AWS console and integrated with our "utsav2601/ihelp" github repository. So whenever anyone merges the code changes in github, it will be build automatically and get deployed if build is successful.

2. Creating the backend with Amplify: Amplify supports creation of backend resources like Databases, Authentication, Storage, Machine learning, analytics and many other useful features. For now, we have setup an GraphQL API. The GraphQL model we created is used by Amplify to create a backend DynamoDB table and it auto generates the code for us. 

#### How to start with Ampify? 
* Install Amplify CLI
* Since we already have the amplify App created, we can simply pull all the configurations using our existing App. 

#### How to make changes in frontend and test it out? 
Since our github repository is already linked with our amplify app, simply keep merging your changes in github and you will see the changes reflected (in around 5-10 mins). This is currently our test domain provided by Amplify where our application is hosted. 

#### How to use our React code base to access our backend database? 
For reference, we have implemented a DAO layer which uses auto generated code (through GraphQL schema) and connects with DynamoDB. For instance, https://github.com/utsav2601/ihelp/blob/main/hospital-locator/src/AdminDb/AdminDbDao.js code has a helper function which list all hospitals from DynamoDb table.

