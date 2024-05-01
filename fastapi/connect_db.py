import mysql.connector
def connect_sql():
        conn_obj = mysql.connector.connect(host="localhost",user="harsh",password="harsh123")
        cur_obj=conn_obj.cursor()
        print(conn_obj)
        return cur_obj
