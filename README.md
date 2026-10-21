# How to use this project
- Fork this repository
- Create a Codespace on main
- Install the dependencies
- Add your data
- Run the backend
- Run the frontend

## Log in to Github and Fork the Repository
Log in to your Github account and create a fork of this repository. 
![Forking the repository](docs/images/Forking%20a%20repo.png)

## Creating a Codespace
Click on the Green code button in your forked repository and under the Codespaces tab, click on "Create Codespace on main"
![Creating a Codespace on the main branch](docs/images/Creating_codespace.png)

## Installing the dependencies
Once your Codespace has started, go to the Terminal tab at the bottom of the interface and it's now time to install the dependencies. 
### Frontend (React and Vite)
For the frontend and the frontend build system. Type the following command
```
npm install
```
### For the backend (PHP with Composer)
In the Terminal, navigate to the backend directory using
```
cd backend
```
Then we can install the backend dependencies using Composer
```
composer install
```
