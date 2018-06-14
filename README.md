# simple restful API project using nodejs

The main idea of this project is from [jadi](http://jadi.net). he made a video series named `bestoon` and made a simple api for daily incomes and expenses using `Django`. so I decided to make an api like his, but using `NodeJS`! and here we go! 

> this project is not complete yet and is under construction!

## how to use
1. first, you must install mongodb and start it's service `systemctl start mongodb` (listening on Default port 27017 )
2. simply clone this repo
3. run `npm install` in project directory to install dependencies.
4. remember to change your `secret` in `config.js` file.
5. `npm start` to start the server

## API routes and parameters

route (path) | method | parameters | requires token
:----------- | :-----: | :------------ | :-----:
/ | GET | - | No
/register | POST | `name`  (optional), `email` (required), `password` (required) | No
/login | POST | `email` (required), `password` (required) | No
/users | GET | - | No
/delete/`userId` | DELETE | - | No
/income | GET | - | Yes
/income | POST | `explain` (required), `meghdar` (required) | Yes
/expense | GET | - | Yes
/expense | POST | `explain` (required), `meghdar` (required) | Yes
/income/`incomeId` | GET | - | No
/income/`incomeId` | PUT | `explain` (optional), `meghdar` (optional) | Yes
/income/`incomeId` | DELETE | - | Yes
/expense/`expenseId` | GET | - | No
/expense/`expenseId` | PUT | `explain` (optional), `meghdar` (optional) | Yes
/expense/`expenseId` | DELETE | - | Yes

>The paths `/users` and `/delete/userId` are for testing purposes and will  be removed.

### todo

list of things that will be added:

- [ ] a simple UI for the API
- [ ] a simple mobile app (maybe using ionic)



