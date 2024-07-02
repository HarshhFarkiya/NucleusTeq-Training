from pyspark.sql import SparkSession
import os
# Initialize SparkSession
spark = SparkSession.builder \
    .appName("PySpark Application") \
    .config("spark.driver.extraJavaOptions", "--add-exports=java.base/sun.nio.ch=ALL-UNNAMED") \
    .config("spark.executor.extraJavaOptions", "--add-exports=java.base/sun.nio.ch=ALL-UNNAMED") \
    .getOrCreate()

file_name = 'data.csv'
current_directory = os.path.dirname(__file__)  # Get the current directory of the Python script
absolute_path = os.path.join(current_directory, file_name)
csv_df = spark.read.csv(absolute_path, header=True, inferSchema=True)

# Show the first few rows of the DataFrame
exp = csv_df.explain()
csv_df.show()

# Display the schema of the DataFrame
csv_df.printSchema()
spark.stop()