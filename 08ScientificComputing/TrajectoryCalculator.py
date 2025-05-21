import math

GRAVITATIONAL_ACCELERATION = 9.81
PROJECTILE = "∙"
x_axis_tick = "T"
y_axis_tick = "⊣"

class Projectile:
    __slots__ = ('__speed', '__height', '__angle')

    def __init__(self, speed, height, angle):
        self.__speed = speed
        self.__height = height
        self.__angle = math.radians(angle)
        
    def __str__(self):
        return f'''
Projectile details:
speed: {self.__speed} m/s
height: {self.__height} m
angle: {round(math.degrees(self.__angle))}°
displacement: {round(self.__calculate_displacement(), 1)} m
'''

    def __calculate_displacement(self):
        cos_angle = math.cos(self.__angle)
        sin_angle = math.sin(self.__angle)
        speed_sq = self.__speed ** 2
        sin_angle_sq = sin_angle ** 2
        
        component_sq = math.sqrt(speed_sq * sin_angle_sq + 2 * GRAVITATIONAL_ACCELERATION * self.__height)
        sin_component = self.__speed * sin_angle + component_sq
        cos_component = self.__speed * cos_angle * sin_component
        
        return cos_component / GRAVITATIONAL_ACCELERATION
    
    def __calculate_y_coordinate(self, x):
       return "Coordinates" 
    
ball = Projectile(10, 3, 45)
