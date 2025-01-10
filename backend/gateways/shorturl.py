from models.shorturl import urlModel
from bson.objectid import ObjectId
import constants
import random
import string


class shorturlBaseGateway:
    def __init__(self, user_id=None):
        self.user_id = ObjectId(user_id) if user_id else None

    def create_short_url(self, url, short_id_length=6):
        url_dict = {
            'source': url,
            'shortId': self.generate_hashId(length=short_id_length)
        }

        if self.user_id:
            url_dict['userId'] = self.user_id

        url = urlModel.insert_one(url_dict)
        return url_dict['shortId']

    def retrieve_source_url(self, short_id):
        query= {'shortId': short_id}
        if self.user_id:
            query['userId'] = self.user_id

        url = urlModel.find(query)
        if not url:
            return None
        return url

    @staticmethod
    def fetch_source_url(short_id):
        url = urlModel.find_one({'shortId': short_id})
        if url:
            return url.get('source')

    def delete_short_url(self, short_id):
        url = urlModel.find_one({'userId': self.user_id, 'shortId': short_id})
        if url:
            urlModel.delete_one({'userId': self.user_id, 'shortId': short_id})
            return True
        return False
        

    @staticmethod
    def generate_hashId(length=6):
        shortId = ''.join(random.choices(
            string.ascii_letters + string.digits, k=length))
        return shortId


class createShortGateway(shorturlBaseGateway):
    def short_urls(self, urlist, short_id_length=6):
        short_url_list = []
        for url in urlist:
            url = str(url)
            shortId = self.create_short_url(url=url, short_id_length=short_id_length)
            short_url_list.append({
                'source': url,
                'shortUrl': constants.SERVER_URL.format(shortId)
            })
        return short_url_list


class updateShortGateway(shorturlBaseGateway):
    def updateShort(self,short_id, source):
        not_found = []
        not_updated = []

        url = urlModel.find_one({'userId': ObjectId(self.user_id), 'shortId': short_id})
        if not url:
            not_found.append(short_id)
            return not_found, not_updated
        
        if url and url.get('source') == source:
            not_updated.append(short_id)
            return not_found, not_updated
        
        find_query = {'shortId': short_id, 'userId': self.user_id}
        update_query = {'$set':{'source': source}}
        urlModel.update_one(find_query, update_query)

        return not_found, not_updated
        

