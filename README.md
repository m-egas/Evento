# Evento

Evento is a web application for discovering, creating, and joining events.

The project was built as a portfolio project to practice React, responsive
design, routing, data fetching, local storage and reusable components.

## Links

- [🌐 Live Demo](https://evento-portfolio.netlify.app)
- [💻 GitHub Repository](https://github.com/m-egas/Evento.git)

## Features

- Discover upcoming events
- Search events by title or category
- Filter events by category
- View detailed event information
- Create a new event
- Join an event
- Sign up for an account
- Log in
- View your events
- Edit events you have created
- Responsive design for desktop and mobile
- Loading and error states
- Reusable React components

## Screenshots

### Home Page

![Home - Page](./screenshots/01-home-desktop-hero.webp)

![Home - Content](./screenshots/02-home-desktop-content.webp)

### Events Page

![Events - Page](./screenshots/03-events-desktop-overview.webp)

![Events - Search ](./screenshots/04-events-desktop-search.webp)

![Events - Not found ](./screenshots/05-events-desktop-search-notfound.webp)

![Events - Filters ](./screenshots/06-events-desktop-filters.webp)

### Add New Event Page

![Add New Event ](./screenshots/07-events-desktop-addnewevent.webp)

### Event Page

![Event Details](./screenshots/08-event-desktop.webp)

### Log in Page

![Evento - Log In Page](./screenshots/09-login-desktop.webp)

### Sign Up Page

![Evento - Sign Up Page](./screenshots/10-signup-desktop.webp)

### Logged-in Home Page

![Logged-in Home Page](./screenshots/11-login-username-desktop.webp)

### Edit Event Page

![Event Page](./screenshots/12-login-event-desktop.webp)

![Edit Event Page](./screenshots/13-login-event-edit-desktop.webp)

### My Events Page

![My Events Page](./screenshots/14-login-myevents-desktop.webp)

## Responsive Design

<div align="center"> <div> 
<img src="./screenshots/15-login-home-mobile.webp" alt="Home - Mobile" width="250"> 
<img src="./screenshots/16-login-events-mobile.webp" alt="Events - Mobile" width="250"> 
</div> <br> <div> 
<img src="./screenshots/17-login-addnew-event-mobile.webp" alt="Add new event - Mobile" width="250"> 
<img src="./screenshots/18-login-event-card-mobile.webp" alt="Event - Mobile" width="250"> 
</div> </div>

## Technologies

- React
- React Router
- Chakra UI
- Vite
- JavaScript
- HTML
- CSS

## Data Storage

Evento was originally developed using a REST API with JSON Server for local development. To make the project available as a live demo without requiring a separate backend server, the data layer was adapted for deployment as a static website.

- events.json contains the initial users, events, and categories used by the application.
- localStorage stores users and events created in the browser.
- localStorage also stores event edits, deleted events, and attendance information.
- Changes made through the application are stored locally in the browser and are not shared between different users or devices.

This approach allows the application to be deployed as a static website while still providing interactive features such as creating, editing, deleting, and joining events.

## Installation / Setup

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

### 1. Clone the repository

Clone the repository and navigate to the project folder.

```bash
git clone https://github.com/m-egas/Evento.git
cd Evento
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

Run:

```bash
npm run dev
```

### 4. Open the app

Open the local URL provided by Vite in your browser.

You are now ready to explore Evento :)
