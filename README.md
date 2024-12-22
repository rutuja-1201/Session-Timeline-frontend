
## Features

- Displays a list of sessions with details such as name, start time, and duration.
- Allows navigation to session-specific timelines.
- Shows participant activities in a graphical timeline view.
- Logs participant events with API integration.


## Setup Instructions

### 1. Clone the Repository

git clone 
cd frontend

**2. Install Dependencies**
Run the following command to install all necessary packages:

npm install

3. Configure Environment Variables
Create a .env file in the frontend directory and add the following environment variable:

REACT_APP_BACKEND_URL=http://localhost:5000/api



**4. Run the Development Server**

In the project directory, you can run:

**npm start**



API Integration
The frontend interacts with the backend via RESTful APIs. Below are key integrations:

**1. Fetch Sessions**
Endpoint: GET /api/sessions
Component: Home.tsx
Description: Fetches and displays a list of sessions.
**2. Fetch Timeline Data**
Endpoint: GET /api/sessions/:sessionId
Component: Timeline.tsx
Description: Fetches session-specific participant timeline data.
**3. Log Participant Events**
Endpoint: POST /api/sessions/:sessionId/participants/:participantId/events/:eventType
Component: TimelineMarker.tsx
Description: Logs participant events when a user interacts with a timeline marker.



