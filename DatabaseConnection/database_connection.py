import mysql.connector
conn_obj = mysql.connector.connect(host="localhost",user="harsh",password="harsh123")
print(conn_obj)
cur_obj=conn_obj.cursor()
try:
	cur_obj.execute("Use test")
	x=cur_obj.execute("SELECT * FROM person")
	print(x)
except:
	print("Some error occured")
for t in cur_obj:
	print(t)
