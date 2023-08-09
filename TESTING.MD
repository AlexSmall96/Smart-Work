# Testing

## Table of Contents

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

[Home Page Tests Screenshots](https://github.com/AlexSmall96/Smart-Work/blob/main/documentation/testing/HomePage.pdf)

### Navigation Bar
| Test No.    | Category    | Pass Criteria | Pass/Fail |
| ----------- | ----------- |---------------|-----------|
|2.1          |Loading Data |Logo loads in top left corner| Pass
|2.2          |Loading Data |When user isn't logged in, the home, signup and signin icons appear| Pass
|2.3          |Loading Data |When user is logged in, the home, my projects, my tasks, sign out and profile icons appear, with the new project icon appearing next to the logo| Pass
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
|5.4           |Loading Data |Edit profile button appears below below profile card, with stats at the bottom of page| Pass
|5.5           |Site Navigation |Clicking edit profile button takes user to form with profile details| Pass
|5.6           |Site Navigation |Clicking go back button takes user to previously visited page| Pass
|5.7           |Loading Data |Each field can be edited with any text value| Pass
|5.8           |Loading Data |Each field can be edited with any text value and chosen value stays in input field| Pass
|5.9           |Loading Data |User can upload a new profile image by clicking 'Click to upload image' and new image is displayed in form | Pass
|5.10           |Input Validation |Any chosen information can be submitted, once form is submitted user is redirected back to profile page and new information is shown | Pass


## User Stories Testing

## Responsiveness

## Validation Testing