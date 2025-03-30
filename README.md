# Build-a-user-profile-management-API-with-authentication



**API Endpoints**


1. User Registration
POST /api/auth/register

Required fields: name, email, password, address
Optional fields: bio, profilePicture

3. User Login
POST /api/auth/login

Required fields: email, password

3. Get User Profile
GET /api/auth/profile/:id

Protected route (requires JWT)
Users can only access their own profile

4. Update User Profile
PUT /api/auth/profile/:id

Protected route (requires JWT)
Users can only update their own profile


**Testing the API**


You can test the API using tools like Postman or cURL:

1. Register a new user:

curl -X POST http://localhost:5000/api/auth/register 
  -H  "Content-Type: application/json" 
  -d  {
       "name":"Aman Singh",
       "email":"aman@example.com",
       "password":"123456",
       "address":"123 Main Station"
    }
    
2. Login:

curl -X POST http://localhost:5000/api/auth/login 
  -H "Content-Type: application/json" 
  -d  {
        "email":"aman@example.com",
        "password":"123456"
      }
      
3. Get profile (use the token from login):

curl -X GET http://localhost:5000/api/auth/profile/YOUR_USER_ID 
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
  
4. Update profile:

curl -X PUT http://localhost:5000/api/auth/profile/YOUR_USER_ID 
  -H "Authorization: Bearer YOUR_JWT_TOKEN" 
  -H "Content-Type: application/json" 
  -d  {
       "bio":"This is my bio"
      }

      
**Dependencies**

Install required packages:
npm install express mongoose bcryptjs jsonwebtoken dotenv cors morgan
