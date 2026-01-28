# Analytics Dashboard

I developed this React-based dashboard to visualize key performance metrics, focusing on precise alignment with the provided Figma designs. The application has interactive charts, date range filtering, and a responsive layout that has basic responsiveness.

## Project Overview

The dashboard provides insights into user activity and system performance, including:
- **User Metrics & Logins**: Tracking total users, active sessions, and daily unique logins.
- **System Load**: Monitoring volume of queries executed and firewall API calls.
- **Performance**: Analyzing average response times for workflows and firewall interactions.
- **Source Breakdown**: A distribution of queries across multiple platforms like Slack and Teams.

## Tech Stack

- **React & TypeScript**: Chosen for robust, type-safe component architecture.
- **Highcharts**: Selected for its flexibility in handling complex datasets and styling customization.
- **CSS**: Used custom CSS with Grid and Flexbox for precise layout control without the overhead of heavy frameworks.
- **Vite**: For a fast, modern development experience.

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Key Decisions and Trade-offs

-   **Component Reusability**: I noticed early on that five of the charts shared an identical structure (header, value, chart area). I extracted this into a reusable `InlineChartCard` component, which drastically reduced code duplication and makes future updates much easier.
-   **Pixel-Perfect Charts**: Matching the Figma design required going beyond default Highcharts settings. I implemented specific logic for bar widths (e.g., exactly 3.41px), border radius, and scrollable plot areas to ensure the density of data points looked exactly right.
-   **Data Simulation**: To mimic a real production environment, I created a data service that simulates network latency and potential random errors. This allowed me to implement and verify loading and error states effectively.
-   **Dynamic Filtering**: While the default view matches the static Figma design (90 days), I ensured the Date Range filter is fully functional. Selecting 7 or 30 days dynamically slices the data to show the correct historical window.

## What I Would Improve With More Time

-   **Theming System**: Currently, some colors are defined inline to match specific chart elements. I would centralize these in a Context or CSS variables for better consistency.
-   **Granular Responsiveness**: The current layout handles a few screen sizes well by stacking columns, but I would add specific optimizations for all screen sizes.
-   **Unit Testing**: I would add Jest/React Testing Library tests, particularly for the data generation logic and component state transitions.

## Approximate Time Spent

~7 hours
