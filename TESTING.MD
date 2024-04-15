# Testing

## Table of Contents
- [Testing](#testing)
  * [Table of Contents](#table-of-contents)
  * [Manual Testing](#manual-testing)
    + [Home Page](#home-page)
    + [Navigation Bar](#navigation-bar)
    + [Signin Page](#signin-page)
    + [Signup Page](#signup-page)
    + [Profile Page](#profile-page)
    + [Project Create Page](#project-create-page)
    + [Projects Page](#projects-page)
      - [Projects](#projects)
      - [Members](#members)
      - [Tasks](#tasks)
    + [Tasks Page](#tasks-page)
  * [Responsiveness](#responsiveness)
  * [User Stories Testing](#user-stories-testing)
  * [Validation Testing](#validation-testing)
## Manual Testing
This section has been divided into subsections based on each page of the site. For each subsection, a table is given with the list of tests required, showing its category, description, and a pass/fail status. Each test has a unique reference number. Where applicable, screenshots are given of evidence of passing the test, with each image referencing the test by its number.
### Home Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
| 1.1         | Loading Data| Cover Text box loads with text displaying correctly|Pass
| 1.2         | Loading Data| Carousel images load correctly with corresponding caption above |Pass
| 1.3         | Loading Data| Carousel cycles through images automatically and when clicked |Pass
| 1.4         | Loading Data| Carousel cycles through images automatically and when clicked |Pass
| 1.5         | Loading Data| Home page loads with get started and login buttons appearing below images |Pass
| 1.6         | Component Interactivity | Hovering over Get Started button or login in button makes them darker |Pass
| 1.7         | Site Navigation| Clicking Get Started Button loads sign up page |Pass
| 1.8         | Site Navigation| Clicking Log in Button loads sign in page |Pass    
| 1.9         | Site Navigation| Clicking sign out successfully signs the user out and appropriate icons appear in navbar 
[Home Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/HomePage.pdf)

### Navigation Bar
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|2.1          |Loading Data |Logo loads in top left corner| Pass
|2.2          |Loading Data |When user isn't logged in, the home, signup and signin icons appear| Pass
|2.3          |Loading Data |When user is logged in, the home, my projects, my tasks, sign out, profile and colour setting icons appear, with the new project icon appearing next to the logo| Pass
|2.4          |Component Interactivity |When the icons are hovered over, they turn blue| Pass
|2.5          |Site Navigation |All the links in the nav bar take the user to the correct page| Pass
|2.6          |Component Interactivity |The icon corresponding to the current page stays blue| Pass

[Navigation Bar Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/NavBar.pdf)

### Signin Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|3.1          |Loading Data |Form loads with sign in button below| Pass
|3.2          |Loading Data |Button with sign up link appears below form| Pass
|3.3          |Loading Data |Image appears next to form on screens >768px in width| Pass
|3.4          |Site Navigation |Sign up button takes user to sign up page| Pass
|3.5          |Input Validation |Submitting the form with username blank gives an error message stating 'Must include "username" and "password"| Pass
|3.6          |Input Validation |Submitting the form with password blank gives an error message stating 'This field may not be blank'| Pass
|3.7          |Input Validation |Submitting the form with incorrect login details gives an error message stating 'Unable to login in with provided credentials' | Pass
|3.8          |Input Validation |Submitting the form with correct login details directs the user to the home page | Pass

[SignIn Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/SignIn.pdf)

### Signup Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|4.1          |Loading Data |Form loads with sign up button below| Pass
|4.2          |Loading Data |Button with sign in link appears below form| Pass
|4.3          |Loading Data |Image appears next to form on screens >768px in width| Pass
|4.4          |Site Navigation |Sign in button takes user to sign in page| Pass
|4.5          |Input Validation |Submitting the form with username or password blank gives an error message stating 'This field may not be blank| Pass
|4.6          |Input Validation |Submitting the form with an insecure password gives messages stating it is not secure enough (too short, too common, entirly numeric)| Pass
|4.7          |Input Validation |Submitting the form with the two password fields not matching gives error message stating the problem| Pass
|4.8          |Input Validation |Submitting the form with an already taken username gives error message stating the problem| Pass
|4.9          |Input Validation |Submitting successful sign up details directs the user to the sign in page| Pass

[Signup Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/SignUp.pdf)

### Profile Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|5.1          |Loading Data |When new profile is created, profile page loads with username, default image, and date joined| Pass
|5.2           |Loading Data |If the user is viewing their own profile, edit profile button appears below below profile card, with stats at the bottom of page| Pass
|5.3           |Loading Data |If the user is viewing another users profile, go back button appears below below profile card, with stats at the bottom of page| Pass
|5.4           |Site Navigation |Clicking edit profile button takes user to form with profile details, with save changes button and go back button appearing below| Pass
|5.5           |Site Navigation |Clicking go back button takes user to previously visited page| Pass
|5.6           |Loading Data |Each field can be edited with any text value and chosen value stays in input field| Pass
|5.7           |Loading Data |User can upload a new profile image by clicking 'Click to upload image' and new image is displayed in form | Pass
|5.8           |Input Validation |Any chosen information can be submitted, once form is submitted user is redirected back to profile page and new information is shown | Pass
|5.9           |Loading Data |Correct numbers appear in stats section | Pass

[Profile Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/ProfilePage.pdf)

### Project Create Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|6.1          |Loading Data |Form loads with text fields blank, dates set to todays date and complexity set to low| Pass
|6.2          |Loading Data |Cancel and create project buttons appear below form| Pass
|6.3          |Site Navigation|Cancel button takes user back to previous page| Pass 
|6.5          |Input Validation|Submitting the form with title field blank gives an error   | Pass 
|6.6          |Input Validation|Trying to change the start date to a date iin the past gives an error  | Pass
|6.7          |Input Validation|Trying to change the due date to a date before the start date gives an error  | Pass
|6.8          |Input Validation|Any value can be inputted into text fields, complexity can be changed to any value | Pass
|6.9          |Site Navigation|Submitting the form with correct data directs the user to the projects page and new project appears | Pass

[Create Project Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/CreateProjectPage.pdf)
### Projects Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|7.1          |Loading Data| Page loads with users projects displayed and colour key for task status at top of page| Pass
|7.2          |Loading Data| Each project is displayed in a box showing project owners profile image, project title, due date, and tasks bar, along with a 'view project details' button| Pass
|7.3          |Loading Data| Task bar shows a colour coded block with numbers corresponding to task status| Pass
|7.4          |Site Navigation| Clicking view project details button takes user to individual project page| Pass

[Projects Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/ProjectsPage.pdf)
### Individual Project Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|8.1          |Loading Data | Box loads showing project data along with delete, edit and members add/delete buttons if user is project owner| Pass
|8.2          |Loading Data | Tasks appear under project box, with a table showing task data and add task button above| Pass
|8.3          |Loading Data | If task is assigned to user edit delete buttons appear| Pass
|8.4          |Loading Data | Tasks are colour coded according to status| Pass
|8.5          |Site navigation| Project edit button takes user to project edit form page| Pass
|8.6          |Site navigation| Project delete button takes user to project delete page| Pass
|8.7          |Site navigation| Members add button takes user to members add page| Pass
|8.8          |Loading Data | All registered users appear in list| Pass
|8.9          |Site navigation | Members delete button takes user to members delete page, where all members of the project appear in a list with delete buttons| Pass
|8.10         |Component Interactivity | Clicking add task button reveals a form where user can create a task| Pass
|8.11         |Component Interactivity | Clicking edit task button reveals a form under task where user can edit task details| Pass
|8.12         |Site navigation | Back to projects button takes user back to projects page | Pass

[Individual Project Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/IndProjectPage.pdf)
### Calendar Page
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------| 
|9.1          | Loading Data             | Page loads with colour key, task filter and current year and month buttons, along with a box for each users projects | Pass
|9.2          | Tasks for project appear colour coded according to status, with start and due dates aligned to headings above             | Page loads with colour key, task filter and current year and month buttons, along with a box for each users projects | Pass
|9.3 |Component Interactivity | Clicking my tasks button at top shows only tasks current user has been assigned to |  Pass
|9.4 |Component Interactivity | Clicking on a month zooms in on the timeline with invidual dates appearing below |  Pass 
|9.5 |Component Interactivity | Clicking arrows next to year increases or decreases year number and changes which tasks appear |  Pass 
|9.6 |Site navigation | Clicking on the task bar takes user to relevant project page |  Pass 

[Calendar Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/Calendar.pdf)
## Defensiveness

## Responsiveness
The full site has been tested across all browser sizes, and every page has been confirmed as presentable and user friendly at each size. Beyond this, below is a list of specific feautures that were tested when changing browser sizes, all of which have passed.

- The Sign in and Sign up pages show the image next to form on screens with >=768px width.
- The image disappears when width goes below 768px, with form moving to center
- On the project component, project details display in two columns at screens with >=768px, and in one column when width is <768px
- Again at the breakpoint of 768px, the task data changes from displaying on one row to two. 
- The Navigation bar collapses into a burger menu at 767px   

Screenshots of these tests along with the full view of the site at different browser sizes is saved in the below link.

[Responsiveness Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/Responsiveness.pdf)

## User Stories Testing
Each of the user stories are given below, along with their acceptance criteria and necessary tasks. User stories are divided based on project goals. All user stories have been followed through to implementation with acceptance criteria passed and required tasks implemented.

- Create a modern, professional-looking project manager app
  - As a User, I would like to be taken to a home page upon sign-in, where it is clear what the function and purpose of the site are.
    - Acceptance Criteria:
        - User is redirected to home page after sign in
        - Home page has engaging pictures and text, clearly describing the websites purpose.
    - Tasks:
        - Redirect user to home page after signing in
        - Include several engaging pictures related to the theme of productivity, project management and social media.
        - Ensure there is a text area describing the role of the site.
        - Inlude links to sign in and sign up on the home page.
  - As a User, I would like to quickly tell which tab corresponds to Smart Work when I have multiple tabs open.
    - Acceptance Criteria
        - Favicon is appropriately chosen to represent the theme of the site
        - Favicon loads correctly when site is opened.
    - Tasks:
        - Choose appropriate favicon
        - Load into index.html file.

- Allow users to easily navigate throughout the site
  - As a User, I can view a navbar on every page of the site, and easily navigate to any other accessible page.
    - Acceptance Criteria :
        - Navbar is present on every page.
        - User can click on links in Navbar and is taken to the correct page.
    - Tasks:
        - Create Nav bar and link each icon to the relevant page.
        - Ensure Nav bar is visible on every page and stays fixed at the top of each page.
        - Only show sign in/sign up icons when user is not logged in.
        - Show all icons when user successfully logs in.

- Allow users to collaborate on projects and tasks
   - As a User, I can create a new project and add members to it.
        - Acceptance Criteria :
            - User can create project and add team members to it
            - Members of project can view in their feed
            - Only owner of project can edit details
            - Users who are not members of the projects cannot view it
        - Tasks:
            - Add a project create page, where users are taken to a form to select project details.
            - Post form data to API.
            - Automatically add user to the members of the project.
            - Redirect user to projects page, ensuring the newly created project is displayed in the feed.
   - As a User, I can select a project I am a member of and view its details.
        - Acceptance Criteria :
            - User can see project in feed and view details.
            - User can't edit project unless they are the owner.
        - Tasks:
            - Get all projects the user is a member of from the API.
            - Display projects on project page.
            - If user is project owner, show edit, delete, add member, and add task buttons.
            - If user is not project owner, only show add task buttons.
   - As a user, I would like to edit the details of the projects that I created or delete them.
        - Acceptance Criteria
            - Project owner can edit all details of project, including adding or removing members. Project owner can delete the project.
            - Members of the project that are not the project owner can only add tasks to it.
        - Tasks:
            - Direct user to edit or delete form when they click on the edit or delete buttons.
            - Post the new data to the API, or use a delete request to delete the project.
            - Ensure the deletion of the project also deletes associated members and tasks data in the backend.
            - Redirect the user back to the projects page, showing the updated data.

- Create a simple effective planning system to help meet deadlines
  - As a user, I would like to add tasks to my projects and update them based on their due date and status.
    - Acceptance Criteria
        - Any member of project can add a task to it.
        - Task has a due date, start date, status and an assigned member.
        - Only the assigned member can edit the task details or delete the task.
    - Tasks
        - On the project view, include an add task button for all members to access.
        - Add a form for the user to select the task details, ensuring the task can only be assigned to members of the project.
        - Post the form data to the API, if successful display the new task in the projects page.
        - Allow the task assigned to member to edit details of the task or remove the task from the project.
  - As a user, I would like to delete a task that I added to a project if I no longer feel it is appropriate.
    - Acceptance Criteria:
        - If user is task owner, they can delete the task.
        - Members of the project that aren't the task owner don't have delete access.
    - Tasks:
        - Include a delete button on the task, only visible to task owner.
        - When selected, delete the task in the backend, and update the project with new data.
- Allow users to customize their profile, and view others
  - As a User, I can register an account so I can access all the features available to signed-up users.
    - Acceptance Criteria
        - User can register account with chosen details.
        - Once registered and signed in, user can access all features available to standard site members.
    - Tasks:
        - Create a sign-up page with a sign-up form.    
        - Display relevant errors in form data to user.
        - If form data is correct, post to the API to create account.
        - If successful, redirect the user to log in page.
        - Update Nav Bar icons to show features available to signed in users.
  - As a user, I would like to view my profile and add personal details such as a profile image, interests, and skills.
    - Acceptance Criteria
        - User can navigate to their profile page and see their details
        - User can edit any of the details of their profile and their updated details are shown to them.
    - Tasks:
        - Create a profile page for the user, with an edit button.
        - Add a from to allow user to select their name, organisation, role, skills, interests and profile image.
        - Post form data to the API.
        - Update user's profile with new data.
  - As a user, I can click on a user's profile image when displayed on relevant pages, and I am taken to their profile page.
        - Acceptance Criteria
        - Where appropriate, where other users names are displayed throughout the site, the user can click on their name to be taken to their profile page.
        - Display the relevant users profile details on their page, but allow read-only access if not the current users profile.
    - Tasks:
        - When a users name features on the site, eg. on the projects page, include a link to that users profile.
        - Ensure link directs user to the correct page.
        - Get the relevant users profile details from the API
        - Display the users details on the profile page, ensuring the appropriate access is given to the current user.

## Validation Testing

- [ES Lint](https://eslint.org/) was used to validate the JS files. All JS files pass through the validator.
- [W3 CSS Validator](https://jigsaw.w3.org/css-validator//) was used to validate the CSS files. All files passed with no issues.
