import pandas as pd
greek_god=pd.read_csv("greek_god.csv")
greek_goddesses=pd.read_csv("greek_goddesses.csv")
#print(greek_god)
#print(greek_goddesses)
#Question 1 -->Merge the data from greek_gods.csv and greek_goddesses.csv based on a common field 
merged=pd.merge(greek_god,greek_goddesses,how="outer")
print(merged)
#Question 2 -->Filter the merged table to only include gods and goddesses who are older than 8000 years, then sort them based on their ages in descending order.
print(merged[merged["Age"]>8000])
#Question 3 --> Join the two tables based on the "Domain" field and calculate the average age of gods and goddesses in each domain.
merged_2=pd.merge(greek_god,greek_goddesses,how="outer")
#print(merged_2)
average_age = merged_2.groupby('Domain')['Age'].mean().reset_index()
print(average_age)
#Question 4 --> .Determine which god/goddess has the highest age, and then find out if they are a god or a goddess.
concat=pd.concat([greek_god,greek_goddesses],ignore_index=True)
print(concat)
max_age=concat["Age"].max()
print(concat[concat["Age"]==max_age])
#Question 5 --> .Create a new column in each table called "Age_Group" and categorize the gods/goddesses into groups such as "Young" (age < 5000), "Middle-aged" (age between 5000 and 8000), and "Old" (age > 8000).
def categorize_age(age):
    if age < 5000:
        return "Young"
    elif age >= 5000 and age <= 8000:
        return "Middle-aged"
    else:
        return "Old"
greek_god["Age_Group"]=greek_god["Age"].apply(categorize_age)
greek_goddesses["Age_Group"]=greek_god["Age"].apply(categorize_age)
print(greek_god)
print(greek_goddesses)
#Question 7 --> 
for index,row in concat.iterrows():
	if row["Age"]>8000:
		print(row)
#Question 8 -->
oldest_name = None
oldest_age = -1

# Iterate over the "Age" column using a while loop to find the oldest god/goddess
i = 0
while i < len(concat):
    age = concat.iloc[i]['Age']
    if age > oldest_age:
        if pd.notna(concat.iloc[i]['God']):
            oldest_name = concat.iloc[i]['God']
        elif pd.notna(concat.iloc[i]['Goddess']):
            oldest_name =concat.iloc[i]['Goddess']
        oldest_age = age
    i += 1
print(oldest_name,oldest_age)
