def add_time(start, duration, day = ""):
    days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    current_day = None
    
    # Start time deconstruction
    if day:
        current_day = days.index(day.lower())
    start_time_split = start.split(" ")
    hour, minute = start_time_split[0].split(":")
    am_or_pm = start_time_split[1]
    if am_or_pm == "AM":
        hour = int(hour) % 12
    elif am_or_pm == "PM":
        hour = (int(hour) % 12) + 12
    
    # Duration deconstruction
    duration_hour, duration_minutes = duration.split(":")
    
    # Calculate elapsed time
    calculated_minutes = int(minute) + int(duration_minutes)
    calculated_hours = int(hour) + int(duration_hour)
    calculated_days = 0
    
    while calculated_minutes >= 60:
        calculated_minutes -= 60
        calculated_hours += 1
    while calculated_hours >= 24:
        calculated_hours -= 24
        calculated_days += 1

    # Update time
    if calculated_minutes == 0:
        new_minute = "00"
    elif calculated_minutes < 10:
        new_minute = f"0{calculated_minutes}"
    else:
        new_minute = calculated_minutes
        
    if calculated_hours == 0:
        new_am_or_pm = "AM"
        new_hour = 12
    elif calculated_hours < 12:
        new_am_or_pm = "AM"
        new_hour = calculated_hours
    elif calculated_hours == 12:
        new_am_or_pm = "PM"
        new_hour = calculated_hours
    else:
        new_am_or_pm = "PM"
        new_hour = calculated_hours - 12
        
    if current_day != None:
        new_day_index = (current_day + calculated_days) % 7
        new_day = days[new_day_index][:1].upper() + days[new_day_index][1:]
        
    #Display new time
    new_time = f"{new_hour}:{new_minute} {new_am_or_pm}"

    if day != "":
        new_time += f", {new_day}"
        
    if calculated_days == 1:
        new_time += f" (next day)"
    elif calculated_days:
        new_time += f" ({calculated_days} days later)"

    return new_time