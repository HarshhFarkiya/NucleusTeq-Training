def get_employee_response(employees):
    all_employees =[]
    keys=["employee_id","employee_name","employee_email","employee_phone","employee_skills","employee_assigned","employee_expereince","project_assigned"]
    for employee in employees:
        details = {}
        for i in range(0,len(employee)):
            details[keys[i]]=employee[i]
        all_employees.append(details)
    return all_employees


