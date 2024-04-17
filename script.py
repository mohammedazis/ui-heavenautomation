from datetime import datetime
import json

import requests


# with open("users.json") as usersFile:
#     users = json.loads(usersFile.read())


# url = "https://api.heavenautomation.digipl.us/auth/signup"

# for user in users:
#     payload = json.dumps(
#         {
#             "name": user["NAME"],
#             "type": user["type"],
#             "password": "123456",
#             "mobileNumber": user["NUMBER"],
#             "isActive": True,
#             "branch": "66145653d943a05caac1ca5c",
#         }
#     )
#     headers = {
#         "Content-Type": "application/json",
#     }
#     response = requests.request("POST", url, headers=headers, data=payload)
#     print(response.json())


with open("services.json") as usersFile:
    users = json.loads(usersFile.read())


url = "https://api.heavenautomation.digipl.us/services"

for user in users:
    payload = json.dumps(
        {
            "name": user["name"],
            "slug": str(user["name"]).replace(" ", "-").lower(),
            "createdAt": datetime.now().isoformat(),
            "createdBy": "6614566ed943a05caac1ca5e",
        }
    )
    headers = {
        "Content-Type": "application/json",
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
