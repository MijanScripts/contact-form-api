# contact-form-api
Backend source code api for my portfolio contact form  
**Technical Report: Full-Stack Portfolio Deployment on AWS EC2**

---

### 1. Introduction

This report documents the end-to-end process of building and deploying a full-stack portfolio website with a functional contact form. The objective was to allow users to view projects and send messages directly through the form, which are then stored in a PostgreSQL database. The final application was deployed to an AWS EC2 instance using Apache to serve the frontend and Node.js/Express to handle backend logic.

**Technologies Used:**

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Database: PostgreSQL
* Server: Apache2 on Ubuntu (EC2)
* Hosting: AWS EC2

---

### 2. Project Architecture

**System Components:**

* **Frontend:** HTML/CSS site served by Apache
* **Backend API:** Node.js + Express application
* **Database:** PostgreSQL running on the EC2 instance

**Architecture Flow:**
Browser → Apache → HTML/JS → Fetch API → Express (Node.js) → PostgreSQL

*Image Placeholder: Architecture Diagram*

---

### 3. Frontend Development

The contact form was designed with HTML and styled using CSS. JavaScript was used to submit form data via the Fetch API.

**Key Features:**

* Input validation
* Form submission with success/error message display
* Stored in a dedicated folder: `/home/ubuntu/portfolio_backend/public`

*Image Placeholder: Contact Form Screenshot*

---

### 4. Backend Development

A Node.js app using Express was created to handle the `/contact` endpoint.

**Key Files:**

* `index.js`: Main server file
* `contact.js`: Handles the Fetch API logic on the frontend
* `.env`: Stores database credentials securely

**Features:**

* Parses JSON
* Connects to PostgreSQL via `pg`
* Uses `cors` middleware to allow cross-origin requests

*Code Snippet Placeholder: Express server and POST route*

---

### 5. PostgreSQL Setup

**Local Testing:**

* PostgreSQL installed and table `contact_messages` created

**EC2 Production:**

* PostgreSQL installed on EC2
* User and table created with correct privileges

```sql
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

*Image Placeholder: psql command line setup*

---

### 6. Deployment to AWS EC2

Deployment was performed on an Ubuntu-based EC2 instance. Git was used to clone the project directly to the server.

**Steps Taken:**

1. Launched Ubuntu EC2 instance
2. Installed required packages:

   ```bash
   sudo apt update
   sudo apt install nodejs npm postgresql apache2 git
   ```
3. Cloned the project repository:

   ```bash
   git clone https://github.com/username/portfolio_backend.git
   ```
4. Navigated to project folder and installed dependencies:

   ```bash
   cd portfolio_backend
   npm install
   ```
5. Set up PostgreSQL:

   * Created database and user
   * Applied correct privileges to allow access from the Node.js backend
6. Edited Apache config to serve static files from `/public` folder:

   ```
   <Directory /home/ubuntu/portfolio_backend/public>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
   </Directory>
   ```

   Enabled necessary modules:

   ```bash
   sudo a2enmod proxy proxy_http rewrite
   sudo systemctl restart apache2
   ```
7. Set environment variables in `.env` file for database connection
8. Backend was configured to run automatically using a system service (e.g., systemd), so no manual start with `node index.js` was necessary.

*Image Placeholder: Apache config and terminal logs*

---

### 7. Testing & Troubleshooting

**Common Issues Encountered:**

* `psql: command not found`
* CORS errors
* Permissions denied on PostgreSQL tables or sequences
* Apache 403 errors (fixed by proper `<Directory>` directive)
* `Failed to fetch` in frontend due to incorrect API path or server not running
* `ENOTFOUND` database hostname errors due to wrong `.env` config

*Image Placeholder: Error messages and fixes*

---

### 8. Final Result

The contact form successfully submits messages, which are stored in the PostgreSQL database on the EC2 instance.

**Validation:**

* API responds with success
* Messages visible in DB via `psql`
* Static frontend served by Apache
* Dynamic backend connected and functioning

*Image Placeholder: Final form and DB query output*

---

### 9. Conclusion

This project covered the complete workflow of building and deploying a full-stack application. Git was used to clone the project to the EC2 instance, eliminating the need for manual file transfers. PostgreSQL, Node.js, and Apache were configured on the same server to deliver both static and dynamic content. The result is a stable, cloud-hosted portfolio site with a working contact form and database integration.

**Future Improvements:**

* Add email notifications on message receipt
* Add HTTPS with Let's Encrypt
* Use Docker for better portability and scalability

---
