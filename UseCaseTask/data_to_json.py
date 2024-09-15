import json

# Function to get user input for a training session
def get_training_session():
    training_session = {}
    training_session["name"] = input("Enter training name: ")
    training_session["date"] = input("Enter training date: ")
    training_session["completed"] = input("Is the training completed? (True/False): ").lower() == "true"
    training_session["instructor"] = {}
    training_session["instructor"]["name"] = input("Enter instructor's name: ")
    training_session["instructor"]["website"] = input("Enter instructor's website: ")
    training_session["participants"] = []
    while True:
        participant_name = input("Enter participant's name (or type 'done' to finish): ")
        if participant_name.lower() == "done":
            break
        participant_email = input("Enter participant's email: ")
        participant = {"name": participant_name, "email": participant_email}
        training_session["participants"].append(participant)

    return training_session

# Get the number of training sessions from the user
num_sessions = int(input("Enter the number of training sessions: "))

# Initialize a list to store the training sessions
training_sessions = []

# Get details for each training session
for _ in range(num_sessions):
    training_session_data = get_training_session()
    training_sessions.append(training_session_data)

# Write the training session data to a JSON file
print(training_sessions)
with open("training_sessions.json", "w") as json_file:
    json.dump(training_sessions, json_file, indent=2)

print(f"{num_sessions} training session(s) saved to 'training_sessions.json'")
