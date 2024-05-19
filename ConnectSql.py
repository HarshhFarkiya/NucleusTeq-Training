import mysql.connector

def connect():
    # Connect to the database
    conn_obj = mysql.connector.connect(
        host="localhost",
        user="harsh",
        password="harsh123",
        database="NucleusTeq"  # Specify the database name here
    )
    return conn_obj

def disconnect(conn_obj):
    # Disconnect from the database
    conn_obj.close()