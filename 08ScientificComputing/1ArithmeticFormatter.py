import re

def arithmetic_arranger(problems, show_answers=False):
    operators = ("+", "-")
    line1 = []
    line2 = []
    divider = []
    answers = []
    if len(problems) > 5:
        return "Error: Too many problems."
    for problem in problems:
        problem_strings = problem.split()
        variable_1_length = len(problem_strings[0])
        variable_2_length = len(problem_strings[2])
        if re.search(r"\D", problem_strings[0]) or re.search(r"\D", problem_strings[2]):
            return 'Error: Numbers must only contain digits.'
        if variable_1_length > 4 or variable_2_length > 4:
            return 'Error: Numbers cannot be more than four digits.'
        if problem_strings[1] not in operators:
            return "Error: Operator must be '+' or '-'."
        solution = eval(problem)
        column_width = 2 + max(variable_1_length, variable_2_length)  
        line1.append(((column_width - variable_1_length) * " ") + problem_strings[0])
        line2.append(problem_strings[1] + ((column_width - variable_2_length - 1) * " ") + problem_strings[2])
        divider.append("-" * column_width)
        answers.append(((column_width - len(str(solution))) * " ") + str(solution))
    formatted_problems = (" " * 4).join(line1)
    formatted_problems += "\n" + (" " * 4).join(line2)
    formatted_problems += "\n" + (" " * 4).join(divider)
    if show_answers:
        formatted_problems += "\n" + (" " * 4).join(answers)
    return formatted_problems

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')