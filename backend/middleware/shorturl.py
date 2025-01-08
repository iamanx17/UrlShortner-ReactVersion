from gateways.shorturl import createShortGateway, shorturlBaseGateway, updateShortGateway
import json


def createShortUseCase(short_url_list, user_id):
    mapped_url_list = createShortGateway(
        user_id=user_id).short_urls(urlist=short_url_list)
    response = {
        "status": "success",
        'data': mapped_url_list
    }
    return response


def updateShortUseCase(short_url_list, user_id):
    not_found_list, not_updated_list = [], []
    print(short_url_list)
    for url_dict in short_url_list:
        source = url_dict.get('source')
        shortId = url_dict.get('shortId')
        update_gateway = updateShortGateway(user_id=user_id)
        not_found, not_updated = update_gateway.updateShort(
            short_id=shortId, source=source)
        not_found_list.extend(not_found)
        not_updated_list.extend(not_updated)

    response = {
        'status': 200,
        'result': 'Update successful'
    }
    if not_found_list:
        response['item_not_found'] = not_found_list

    if not_updated_list:
        response['item_not_updated'] = not_updated_list
        response['message'] = 'Source is already matched'

    return response


def deleteShortUseCase(short_url_id, user_id):
    is_deleted = shorturlBaseGateway(
        user_id=user_id).delete_short_url(short_id=short_url_id)
    if is_deleted:
        return {
            'status': 200,
            'result': "Deletion successful"
        }
    return {
        'status': 404,
        'result': 'This Url is not Found'
    }


def retrieveShortUseCase(short_id, user_id):
    url_response = shorturlBaseGateway(user_id=user_id).retrieve_source_url(short_id=short_id)
    if not url_response:
        return {'status': 404, 'message': 'url not found'}

    return {
        'status': 200,
        'data': {
            'source': url_response.get('source'),
            'shortId': url_response.get('shortId')
        }
    }
