# Tasty 
A recipe app, developed using React, Express, and the Spoonacular API, which allows users to search and view recipes along with comprehensive instructions and ingredients. This project is deployed on Vercel, you can try the app [here](https://tasty-delta.vercel.app/).

## Technologies Used

Main Stack:

- React
- Express
- Node
- MongoDB

Additional Libraries:

- JSONWebToken
- Bcrypt
- Styled-Components
- React Router

## Demo Video

https://github.com/oswaldoosw/Tasty/assets/103481357/cfacd95b-80f9-4bef-ab94-559189a83edd

## User Stories

- User should be able to login, logout, and register
- User can view vegetarian and popular recipes on the home page
- User should be able to view the recipe page, complete with its instructions and ingredients
- User should be able to leave a rating on a recipe page
- User should be able to add and delete a comment on a recipe page
- User can search for recipes using the search bar located on the home page
- User can view a list of recipes based on their culinary origin

## Wireframes

These are some of the wireframes I created during the creation of the app. Some features such as the comment on recipe page functionality are not yet implemented during that time.

### Home Page
![Group 1](https://github.com/oswaldoosw/Tasty/assets/103481357/79c6193f-8aaf-4d10-8f62-2e0778233940)

### Recipe Page
![Group 2](https://github.com/oswaldoosw/Tasty/assets/103481357/672f24d8-c99a-4b44-9f9e-e88e07f041d4)

### Results Page
![Group 3](https://github.com/oswaldoosw/Tasty/assets/103481357/9fca9943-266c-40bf-9d32-7253d8d0dffa)

## APIs Used

In this project, I used Spoonacular API to fetch the recipes. This API provides essential information necessary to create a proper food recipe, which includes ingredients and detailed instructions. I am currently using their free-of-charge plan, which only allows 150 fetches per day, so the recipes on the home page are cached in LocalStorage to avoid reaching the allowed limit. This API has some useful functionalities, such as searching recipes by query and filtering recipes by their cuisine, all of which are implemented in this app.

Since Spoonacular API only provides recipe information, I made an API/backend called Tasty-Backend to handle user-related functionalities. Every user and additional recipe information (ratings and comments) are stored inside MongoDB after being processed by the backend. I have implemented additional safety measures in the backend, such as user password encryption to make the app more secure. This backend is also deployed on Vercel and is readily available for use. Link to the backend repository [here](https://github.com/oswaldoosw/Tasty-Backend).

## Development Process

### 1. Fetching Data from Spoonacular API
Data fetch happens once on the initial render of the home page, which is made possible by the usage of React useEffect hook with an empty dependency array. The Spoonacular API has a limit of 150 calls per day for its free-of-charge plan. To circumvent this, all of the fetched recipes on the home page are cached in LocalStorage to avoid reaching the call limit. You can refer to `/src/components/Popular.jsx` and `/src/components/Vegetarian.jsx`, as these are the two components rendered on the home page.

For more information, Spoonacular has full documentation of all the available API functions [here](https://spoonacular.com/food-api/docs).

### 2. Repository Structure
The frontend is separated into two main folders, which are components and pages. Pages consist of multiple components integrated to make a page. For example, a FoodRecipe page consists of multiple components, such as the Rating and CommentSection components.

### 3. Creating the Main Page
The main page consists of 4 components:
- `SearchBar`component which takes in the user's query and triggers the onSubmit function which redirects the user to the search results page
- `Vegetarian` component which displays 8 random vegetarian recipes. This component uses Splide, a library that allows the user to slide through the recipes. Unfortunately, Splide doesn't seem to support responsive web design, which causes this component to look distorted on mobile phones. The recipes are cached inside LocalStorage to prevent API call limit and to preserve the same recipes upon further page reloads
- `Popular` component which displays 8 random recipes. This component uses css grid view which allows it to be responsive. Just like the `Vegetarian` component, the recipes are cached inside LocalStorage
- `Footer` component which credits Spoonacular API and other libraries used in this app

`Vegetarian` and `Popular` components both consist of multiple `DishCard` components.
- `DishCard` component displays all information associated with the recipe, such as recipe name, image, and rating. When either the image or the Go button is clicked, it redirects the user to the recipe page

### 4. Recipe Page
The recipe page consists of two important elements in a recipe, instructions and ingredients, both of which are pulled from Spoonacular API using recipe ID. Two buttons are used to separate the ingredients and instructions. These buttons apply the concept of conditional rendering, allowing the instructions and ingredients to be displayed interchangeably. The instructions pulled from the Spoonacular API are usually clear and concise, but can be ambiguous or incomplete at times. Unfortunately, there is no way to circumvent this unless Spoonacular fixes them.

### 5. Filter by Cuisine and Search Recipe Function
On the main page, there are 4 buttons in which users can filter recipes based on their culinary origin. As of now, there are 4 categories, American, Chinese, Japanese, and Mexican cuisines. During the process of fetching data, javascript's async and await are used here so that the loader shows up when the app isn't done fetching and disappears when the data is successfully fetched and the results are shown. Spoonacular API's complexSearch does not return any data other than the recipe name and the image, therefore another API call to fetch the remaining data like servings and cooking time is required. For more information, refer to `/src/pages/Dishes.jsx`.

The user can also search for recipes by inputting a query inside the search bar located on the main page. Similar to the filter by cuisine functionality, this function also utilizes Spoonacular API's complexSearch and the same loader. For more information, refer to `/src/pages/Searched.jsx`.

### 6. Login and Register System
The app is a fully functioning recipe app by now, as it allows the user to land on the home page and view the recipes. However, if additional features like the rating and comment system are to be implemented, a backend is necessary. Therefore, I created the backend using Express which is connected to my MongoDB. For the register and login system, the frontend sends an API call to the backend while including credentials in the body. Every password is encrypted using bcryptjs' hash function before they are stored in the database to ensure some degree of safety. The login and register follow the same logic, where the user's credentials are compared to the existing ones in the database using mongoose findOne function. For more information, you can refer to `/src/components/SignIn.jsx` in this repository and `/controllers/userController.js` in the Tasty-Backend repository.

### 7. Rating and Comment System
With the login and register system finished, I decided to add a rating system, an essential element to a recipe app. This feature is only available to users who have registered and are actively signed in on the application. Through the use of the useState hook, the rating can be updated dynamically without needing a full page refresh. The rating system also stores users' past ratings so that they can update them in the future. Refer to `/src/components/Rating.jsx` in this repository and `/controllers/recipeController.jsx` in the Tasty-Backend repository for more information.

Similar to the rating system, the comment system is only available for those who are signed in. I implemented a pagination system that displays only 5 comments per page. The commenters are only allowed to give comments with more than 5 characters to hopefully alleviate spam, and they're also allowed to remove their comments. When the user presses the submit button, all of the data related to the comment, such as the name of the person commenting and the comment creation date are pushed to the database upon the user's token verification in the backend. For more information regarding the comment system, refer to `/src/components/CommentSection.jsx` and `/src/components/Pagination.jsx` in this repository as well as `/controllers/recipeController.jsx` in the Tasty-Backend repository.

### 8. Final Touches and Deployment
I researched quite a bit for suitable deployment services and stumbled upon a few candidates, such as Heroku, Railway, and Vercel. I decided to settle with Vercel as they offer a free Hobby plan. The deployment encountered some problems at first, as Vercel had a certain rule of repository structure for backend deployments. After the backend deployment was successful, I replaced all of the endpoints for data fetches in the frontend to point toward the deployed backend endpoints, essentially from `localhost:port` to `tasty-backend.vercel.app`. Finally, I deployed the frontend and have made some minor bug fixes since then.

## Tasty-Backend API

| Method | Address                  | Description                                                 |
| ------ | ------------------------ | ----------------------------------------------------------- |
| POST   | /login         	         | User login                                                  |
| POST   | /register                | User registration                                           |
| POST   | /user                    | Get the user's information using JSONWebToken               |
| GET    | /recipe                  | Get the recipe information through recipe ID                |
| GET    | /rating                  | Get the user's past rating on a recipe page as well as      |
|        |			                       | the average rating and submitted rating count of the recipe |
| PATCH  | /recipe/comment          | Add a comment made by the user on a certain recipe page     |
| DELETE | /recipe/comment/delete   | Delete a comment made by the user on a certain recipe page  |
| PATCH  | /recipe/rate             | Edit the recipe's rating based on the user's submitted      |
|	       |			                       | rating 						                                            	  |

## Installation

Instead of cloning the app locally, you can just visit https://tasty-delta.vercel.app/. If you decide to run the app locally, you only need to clone the frontend as it fetches data directly from the already deployed backend.
 
You can run the app locally by doing the following steps:

1. Clone this repository

```
git clone https://github.com/oswaldoosw/Tasty.git
```

2. Install packages

```
npm i
```

3. Run the app locally

```
npm start
```
