# ByteBattles - Competitive Programming Platform

User Site: [https://bytebattles.vercel.app/](https://bytebattles.vercel.app/)

Admin Site: [https://bytebattles-admin.vercel.app/](https://bytebattles-admin.vercel.app/)

ByteBattles is a web-based competitive programming platform built using Spring Boot for the backend and ReactJS for the frontend. It provides a comprehensive environment for both admins and users to engage in competitive programming challenges, contests, and problem-solving activities.

## Functionalities

### Admin

- **Problem Management**: Administrators can perform CRUD (Create, Read, Update, Delete) operations on problems. This includes adding new problems, editing existing ones, and removing outdated or irrelevant ones.
- **Contest Management**: Admins have full control over creating, managing, and scheduling contests. They can set contest durations, rules, and other parameters.
- **Tag Management**: Tags help categorize problems for easier navigation and recommendation. Admins can manage tags by creating, editing, or deleting them as needed.
- **Test Case Management**: Admins can upload and manage test cases for problems to ensure accurate evaluation of user submissions.
- **Submission Monitoring**: Admins have access to view and delete user submissions. This feature helps maintain the integrity of the platform by managing inappropriate or invalid submissions.
- **Monitoring via Charts**: ByteBattles provides visual insights into platform usage and performance through interactive charts. Admins can monitor various metrics such as user activity, submission trends, and contest participation.

### User

- **Registration**: ByteBattles supports user registration, which requires email verification. This ensures the security and authenticity of user accounts and prevents misuse of the platform.
- **Problem Solving**: Users can solve individual problems available on the platform. They can submit their solutions and receive feedback on correctness and efficiency.
- **Contest Participation**: Users can participate in scheduled contests within a specified time frame. They can solve a set of problems within the contest duration.
- **Problem Recommendations**: Based on a user's past accuracy and performance in specific problem tags, ByteBattles offers personalized problem recommendations. This feature helps users improve their skills by focusing on areas where they need more practice.
- **Progress Tracking**: Users can track their progress over time through visual charts. These charts display metrics such as difficulty-wise solved problems and overall performance.
- **Submission Status**: Users can view the status of their submissions, including whether they are accepted, rejected, or have Runtime Errors.

## Setup Instructions

### Prerequisites

Before setting up ByteBattles, ensure you have the following prerequisites installed:

- **Java Development Kit (JDK)**: Required for running the Spring Boot backend.
- **Node.js and npm**: Needed for running the ReactJS frontend.
- **MySQL Database**: Database management system for storing application data.
- **IDE (Integrated Development Environment)**: Recommended IDEs include IntelliJ IDEA or VS Code for backend and frontend development.

### Backend Setup (Spring Boot)

1. **Clone the ByteBattles repository**:

   ```
   git clone https://github.com/kevintamakuwala/ByteBattles.git
   ```

2. **Import the backend project** into your preferred IDE (e.g., IntelliJ IDEA).

3. **Configure the database connection**:
   
   - Open the `application-dev.properties` file located in `backend/AuthenticatedBackend/src/main/resources`.
   - Update the database connection properties such as URL, username, and password according to your MySQL configuration.

4. **Build and run the Spring Boot application**:
   
   - Run the main class `AuthenticatedBackendApplication.java` to start the Spring Boot server.

### Frontend Setup (ReactJS)

#### For Admin:

1. **Navigate to the `Admin` directory** within the ByteBattles repository:

   ```
   cd ByteBattles/frontend/Admin
   ```

2. **Install frontend dependencies** using npm:

   ```
   npm install
   ```

3. **Start the React development server**:

   ```
   npm start
   ```

#### For User:

1. **Navigate to the `User` directory** within the ByteBattles repository:

   ```
   cd ByteBattles/frontend/User
   ```

2. **Install frontend dependencies** using npm:

   ```
   npm install
   ```

3. **Start the React development server**:

   ```
   npm run dev
   ```

### Accessing ByteBattles

Once both the backend and frontend are running, you can access ByteBattles by navigating to the provided URLs in your web browser:

- **User Site**: [http://localhost:3000](http://localhost:3000)
- **Admin Site**: [http://localhost:3001](http://localhost:3001)
- **Backend**: [http://localhost:8000](http://localhost:8000)

## Usage

- **Admin Panel**: Log in with admin credentials to access the admin panel. From here, you can manage problems, contests, tags, test cases, and monitor platform activity via charts.
- **User Dashboard**: After registering and logging in, users can solve problems, participate in contests, view recommendations, track progress, and manage submissions from their dashboard.

## Contribute

If you'd like to contribute to ByteBattles, feel free to fork the repository, make your changes, and submit a pull request. We welcome contributions of all kinds, including bug fixes, feature enhancements, and documentation improvements.

## Contact

For any inquiries or support regarding ByteBattles, please contact us at [bytebattles16@gmail.com](mailto:bytebattles16@gmail.com).

---

Made by [Kevin Tamakuwala](https://github.com/kevintamakuwala) and [Rushi Sureja](https://github.com/Sureja-Rushi)

Thank you for choosing ByteBattles! Happy coding, and may the algorithms be ever in your favor! 🚀