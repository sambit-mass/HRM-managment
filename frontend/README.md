backend APi : https://hrm-backend-xpn8.onrender.com/api


For Employees===>

For getting all employee detail (for HR)
API ENDPOINT => /user/read/all
Method: get
payload => 


For Creating employee (for HR)
API ENDPOINT => /user/create
Method:POST
payload =>
 {
    "name":"Hr",
"email":"hr@gmail.com",
"password":"hr123",
"role":"HR",
"department": "hr",
"salary": 80000
}

For Updating employee (for HR)
API ENDPOINT => /user/update/67ae34f546d9f2d3ec7f81af
Method:POST
payload =>
 {
    "name":"Adi",
"email":"adidfsg@gmail.com",
"password":"ksdjalk",
"role":"EMPLOYEE",
"department": "it",
"salary": 800000000
}

For Deleteing employee (for HR)
API ENDPOINT => /user/delete/67ae34f546d9f2d3ec7f81af
Method:DElete
payload =>

For getting  employee by id (for HR)
API ENDPOINT => /user/read/67ae3a76b47a930f2dc300b0
Method:get
payload =>

For log in 
API ENDPOINT => /user/login
Method:post
payload =>{
    "email":"hr@gmail.com",
"password":"hr123"
}


For Leave ===========>

For Applying Leave 
API ENDPOINT =>/leave/apply
Method:post
payload =>{
  "userId": "67af607b3e03c424a0d756f2",
  "leaveType": "Sick",
  "startDate": "2025-02-15T09:00:00.000Z",
  "endDate": "2025-02-20T17:00:00.000Z",
  "reason": "Experiencing high ",
  "status": "Pending"
}

For All Leave 
API ENDPOINT =>/leave/all
Method:Get
payload =>


For action
API ENDPOINT =>/leave/action
Method: post
payload =>{
    "id":"67ae7141ccbbb1b4e210fe4d",
    "status":"Approve"
}


FOR ATTENDENCE =========>


for check in
API ENDPOINT =>/attendance/checkin
Method: post
payload =>

for check out
API ENDPOINT =>/attendance/checkout
Method: post
payload =>


For Calculating Payroll
API ENDPOINT =>/payrollt
Method: post
payload =>
