/**
 * WallController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var Instagram = require('instagram-node-lib');
var url1 = "https://api.instagram.com/v1/tags/";
var url2 = "/media/recent?client_id=c2d7726b5d5e42138eddcd08c84f80f7";
var token = "access_token=47710748.5b9e1e6.9d4b692d1a2a40c3911905a85671cb24";
var userid = "47710748";

module.exports = {

  index: function(req, res, next){
    Instagram.set('client_id', 'c2d7726b5d5e42138eddcd08c84f80f7');
    Instagram.set('client_secret', '4c512b19c3d84275827bde3afd70221d');
    Instagram.set('callback_url', 'http://zwall.herokuapp.com/wall/callback');
    Instagram.set('redirect_uri', 'http://zwall.herokuapp.com/wall');
    Instagram.set('maxSockets', 10);
    Instagram.media.subscribe();
  },

  getCallback: function(req, res, next){
    console.log("get");
    var handshake =  Instagram.subscriptions.handshake(req, res);
  },

  postCallback: function(req, res, next){
    console.log("post")
    var data = req.body;
    console.log(data)
  },


};
