from pymongo import MongoClient
from bson.objectid import ObjectId
client = MongoClient("mongodb+srv://iamanx17:2ceinwar@urlshortner.f1d74.mongodb.net/")

db = client['urlshortner']



short_url = db['shorturls']


response = short_url.find({'userId': ObjectId('677e586daa9f3ed01d27816f') })

print(response)
for r in response:
    print(r)


"""
{'_id': ObjectId('677e590a396cc3780f808f11'), 'source': 'https://google.com/', 'userId': ObjectId('677e586daa9f3ed01d27816f'), 'shortId': 'Li9L1v'}
{'_id': ObjectId('677e590b396cc3780f808f13'), 'source': 'https://reddit.com/', 'userId': ObjectId('677e586daa9f3ed01d27816f'), 'shortId': 'zgAMYd'}
{'_id': ObjectId('67813554fff830b27e7c0da8'), 'source': 'https://google.com/', 'shortId': 'z2hU6o', 'userId': ObjectId('677e586daa9f3ed01d27816f')}
"""
