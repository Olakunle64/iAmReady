def get_cookie(self, request=None):
        # {"session_id":"ccfa88ad-bc97-42b4-bbf7-d48b62d18ce2","user_type":"j"}
        if request.headers.get("Authorization"):   
            cookie = request.headers.get("Authorization")
            session_id = cookie.split(",")[0].split(":")[1].strip('"')
            user_type = cookie.split(",")[1].split(":")[1].split("}")[0].strip('"')
            return {
                "session_id": session_id,
                "user_type": user_type
            }
        return None

## Deployment
The iAmReady website is currently deployed on [Heroku](https://www.heroku.com/) and can be accessed at [https://iamready.herokuapp.com](https://iamready.herokuapp.com).
