from googlesearch import search
import re

query = '"C.E. República de Canadá" El Salvador coordinates'
for j in search(query, num=3, stop=3, pause=2):
    print(j)
