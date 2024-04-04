import json

# JSON data representing a training session
training_session_json = '''
{
  "name": "Python Training",
  "date": "April 19, 2024",
  "completed": true,
  "instructor": {
   "name": "XYZ",
   "website": "http://pqr.com/"
  },
  "participants": [
    {
      "name": "Participant 1",
      "email": "email1@example.com"
    },
    {
      "name": "Participant 2",
      "email": "email2@example.com"
    }
  ]
}
'''

# Parse the JSON data
training_session = json.loads(training_session_json)

# Access and print details of the training session
print("Training Name:", training_session["name"])
print("Date:", training_session["date"])
print("Completed:", training_session["completed"])

# Access and print details of the instructor
print("\nInstructor:")
print("Name:", training_session["instructor"]["name"])
print("Website:", training_session["instructor"]["website"])

# Access and print details of the participants
print("\nParticipants:")
for participant in training_session["participants"]:
    print("Name:", participant["name"])
    print("Email:", participant["email"])
    print()
