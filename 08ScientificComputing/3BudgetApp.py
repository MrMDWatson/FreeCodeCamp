import math

category_list = []

class Category:
    def __init__(self, category):
        
        self.category = category
        self.ledger = []
        self.balance = 0
        category_list.append(self)
    
    def __str__(self):
        display = self.category.center(30, "*") + "\n"
        for transaction in self.ledger:
            transaction_amount = "{:.2f}".format(transaction["amount"])
            spacing = (30 - (len(str(transaction_amount[:7])) + len(transaction["description"][:23])))
            display += transaction["description"][:23] + spacing * " " + transaction_amount[:7] + "\n"
        display += f"Total: {self.balance:.2f}"
        return display
    
    def get_balance(self):
        return self.balance
    
    def check_funds(self, amount):
        return amount <= self.balance
    
    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})
        self.balance += float(amount)
    
    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -1*amount, "description": description})
            self.balance -= float(amount)
            return True
        else:
            return False
        
    def transfer(self, amount, category):
        if self.withdraw(amount, f"Transfer to {category.category}"):
            category.deposit(amount, f"Transfer from {self.category}")
            return True
        else:
            return False
    
def create_spend_chart(categories):
    withdrawl_total = 0
    withdrawls_by_category = []

    for category in categories:
        category_total = 0
        for transaction in category.ledger:
            if float(transaction["amount"]) < 0:
                category_total += float(transaction["amount"])
                withdrawl_total += float(transaction["amount"])
        withdrawls_by_category.append([category.category, category_total])

    percentage = 100
    chart = "Percentage spent by category\n"
    while percentage >= 0:
        if percentage == 0:
            chart += f"  {percentage}| "
        elif percentage < 100:
            chart += f" {percentage}| "
        else:
            chart += f"{percentage}| "
            
        for category in withdrawls_by_category:
            category_percentage = "{:.2f}".format((math.floor(10 * (category[1] / withdrawl_total)))/10)
            if float(category_percentage) >= float(percentage/100):
                chart += "o  "
            else:
                chart += "   "
        chart += "\n"
        percentage -= 10
        
    chart += " "*4 + "-" + "-"*(len(categories) * 3) + "\n"
    y_axis_length = max(map(lambda x : len(x.category), categories))
    for index in range(y_axis_length):
        chart += (" " * 5)
        for category in categories:
            if index < len(category.category):
                chart += f"{category.category[index]}  "
            else:
                chart += " "*3
        if index < y_axis_length - 1:
            chart += "\n"
    return chart

food = Category("Food")
food.deposit(900, 'deposit')
food.withdraw(45.67, 'milk, cereal, eggs, bacon, bread')
auto = Category("Auto")
auto.deposit(900, 'deposit')
auto.withdraw(245.77, 'insurance')

for category in category_list:
    print(category)
print(create_spend_chart(category_list))