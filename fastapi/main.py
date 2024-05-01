import mysql.connector
from fastapi import FastAPI

app = FastAPI()

conn_obj = mysql.connector.connect(host="localhost", user="harsh", password="harsh123", database="test")
cur_obj = conn_obj.cursor()

@app.get("/student")
def get_students():
    try:
        query = "SELECT * FROM STUDENTS"
        print(query)
        cur_obj.execute(query)
        result = cur_obj.fetchall()
        return result
    except mysql.connector.Error as e:
        print(f"Error executing query: {e}")
        return []

@app.post("/student")
def add_student(student: dict):
    try:
        query = f"INSERT INTO STUDENTS VALUES ('{student['name']}', '{student['age']}')"
        print(query)
        cur_obj.execute(query)
        conn_obj.commit()
        return {"message": "Student added successfully"}
    except mysql.connector.Error as e:
        print(f"Error adding student: {e}")
        conn_obj.rollback()
        return {"message": "Error adding student"}
