# Airbnb Social Media Analytics Dashboard

### This is a project developed by The Last Mile Works for Airbnb designed to display 
and track social media analytics.

View the project live at http://airbnb.tlmworks.org/#/?_k=g4kv05

or run locally from the source directory by typing ```npm start```

Developers:

Steve Lacerda
Chris Schuhmacher

The back-end was developed using a Node and Express framework.

The front-end was developed using React.

### Notes

Before starting this project, the team at The Last Mile Works had to gain an understanding
of OAuth process and how the different social media sites used authorization codes 
and access tokens to authenticate requests.  To simulate the oauth flow and test  
during the development process, our team built mock authorization servers for Facebook, 
Twitter, Instagram, and Pinterest. This gave us the confidence that  our app would 
work once we deployed the dashboard live on the internet.

Steve was responsible for building the back-end using Node and Express.  He used 
Mongo to store the client app's authentication information, as well as the social 
media count data over time.  

Chris built the front-end using React and the D3 library for line chart data visualizations.  
He also made great use of React's component, router, and webpack capabilities.
