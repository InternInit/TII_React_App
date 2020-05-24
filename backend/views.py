from flask import Blueprint, jsonify, request, redirect, make_response
import requests
import json

main = Blueprint("main",__name__)

apiUrl = "https://jzvyvnvxld.execute-api.us-east-1.amazonaws.com/beta/"

username = "3og5ph16taqf598bchokdfs1r2"
password = "bpuroud7lcqo5t3eomd6nvsspthu83c7e9taik2cqentf4f0o6g"
tokenUrl = "https://auth.interninit.com/oauth2/token"
testUrl = "https://webhook.site/c2795845-3b0d-4cf1-8ac4-3da037d87588"

@main.route("/get_user_data")
def get_user_data():
    return jsonify({"UserData": {}})


@main.route("/update_user_data", methods=["POST"])
def update_user_data():
    body = request.get_data().decode("utf-8")
    body = body.split("#")

    info = json.loads(body[0])
    origin = str(body[1])
    info["origin"] = origin
    print(info)
    req = requests.post(apiUrl, json = info)
    return jsonify(req.text)

@main.route("/auth", methods=["POST"])
def auth():
    rawBody = request.get_data()
    body = rawBody.decode("utf-8")
    print(rawBody)
    req = requests.post(tokenUrl, headers={"Authorization":"Basic M29nNXBoMTZ0YXFmNTk4YmNob2tkZnMxcjI6YnB1cm91ZDdsY3FvNXQzZW9tZDZudnNzcHRodTgzYzdlOXRhaWsyY3FlbnRmNGYwbzZn","Content-Type":"application/x-www-form-urlencoded"}, data={"grant_type" : "authorization_code", "client_id":username, "code":rawBody, "redirect_uri":"http://localhost:3000"})

    try:
        load = json.loads(req.text)
        refresh_token = load["refresh_token"]

        response = jsonify(req.text)
        response.set_cookie("refresh_token", value=refresh_token, httponly = True)
        return response
    except KeyError:
        print("Invalid Grant")
        return jsonify("Invalid Grant")

@main.route("/auth/refresh")
def refresh():
    refresh = request.cookies.get("refresh_token")
    if(refresh == None):
        return jsonify(refresh)
    else:
        return jsonify(refresh)


@main.route("/auth/exchange")
def exchange():
    refresh = request.cookies.get("refresh_token")
    req = requests.post(tokenUrl, headers={"Authorization":"Basic M29nNXBoMTZ0YXFmNTk4YmNob2tkZnMxcjI6YnB1cm91ZDdsY3FvNXQzZW9tZDZudnNzcHRodTgzYzdlOXRhaWsyY3FlbnRmNGYwbzZn","Content-Type":"application/x-www-form-urlencoded"}, data={"grant_type" : "refresh_token", "client_id":username, "refresh_token":refresh})

    response = jsonify(req.text)
    return response

@main.route("/logout")
def logout():
    resp = make_response("Response!")
    resp.delete_cookie("refresh_token")
    return resp
