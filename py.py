import requests

url='https://tamilgun.group'

try:
    response = requests.get(url)
    print(response.status_code)
    if response.status_code == 200:
        print("Website uses HTTPS with a valid certificate")
    else:
        print("Website does not use HTTPS with a valid certificate")
except requests.exceptions.SSLError:
    print("Website has an INVALID SSL certificate!")
