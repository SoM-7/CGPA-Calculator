# CGPA Calculator (Semester Wise)

grade_points = {
    "O": 10,
    "E": 9,
    "A": 8,
    "B": 7,
    "C": 6,
    "D": 5,
    "F": 2
}

total_points_all = 0
total_credits_all = 0

semesters = int(input("Enter number of semesters: "))

for s in range(1, semesters + 1):
    print(f"\n----- Semester {s} -----")
    
    subjects = int(input("Enter number of subjects: "))
    
    semester_points = 0
    semester_credits = 0
    
    for i in range(1, subjects + 1):
        grade = input(f"Enter grade for subject {i} (O/E/A/B/C/D/F): ").upper()
        credit = int(input(f"Enter credit for subject {i}: "))
        
        if grade in grade_points:
            points = grade_points[grade] * credit
            semester_points += points
            semester_credits += credit
        else:
            print("Invalid grade! Skipping subject.")
    
    if semester_credits != 0:
        sgpa = semester_points / semester_credits
        print(f"SGPA for Semester {s}: {round(sgpa, 2)}")
        
        total_points_all += semester_points
        total_credits_all += semester_credits

# Final CGPA
if total_credits_all != 0:
    cgpa = total_points_all / total_credits_all
    print("\n======================")
    print("Final CGPA:", round(cgpa, 2))
else:
    print("No valid credits entered.")