# TASKAHOLIK

## A React web application built with Create-React-App and Ruby on Rails on the back end.

### Built with React 17.0.2

Use the deployed app from Github Pages here:
https://dirklo.github.io/taskaholik-front-end/

View the back end repository here:
https://github.com/dirklo/taskaholik-back-end

## Installation instructions
* Clone this repo and run `npm install`
* check the `baseUrl` setting in `src/helpers/helpers.js`
* use 'https://taskaholik-back-end.herokuapp.com' to run the deployed back-end or
* use 'http://localhost:3001' to run the back-end server locally

# Key Features

## Database Design
The relational database (PostgreSQL) is centered around 4 main models: Team, Project, Task, Detail.  Each belong to their creator, and teams have many projects, projects have many tasks, tasks have many details.  This gives teams the side-by-side look at the complete project, and users can quickly navigate into the small details to see or update their status or comments.  Users can leave comments on either tasks or details, and these comments can be deleted by their author or the team leader.  Team members can also be assigned to a particular task through the assignments model, and belong to a team through the memberships model.  See my complete database brainstorm below:

![taskaholik-database](https://user-images.githubusercontent.com/72274257/122393607-55a60900-cf75-11eb-8309-7fe298e7ea25.jpg)

## Create A new Team
First-time users will first be asked to create a team if they are not a member of one already.
![taskaholik-create-team](https://user-images.githubusercontent.com/72274257/122394435-44a9c780-cf76-11eb-9edf-1d1a8873d798.jpg)

## Start A Project
From the dashboard, you can start your first new project.  You can add an optional deadline, and don't worry, this can be changed later!

![taskaholik-create-project](https://user-images.githubusercontent.com/72274257/122394543-66a34a00-cf76-11eb-8dcb-6a9e6a07cb36.gif)

## Add Goals
Users can add over-arching goals for the project.

![taskaholik-add-goals](https://user-images.githubusercontent.com/72274257/122395031-e03b3800-cf76-11eb-8993-8d48ed5065cf.gif)



