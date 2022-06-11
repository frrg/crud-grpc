// package: model
// file: model/user.proto

var model_user_pb = require("../model/user_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var UserService = (function () {
  function UserService() {}
  UserService.serviceName = "model.UserService";
  return UserService;
}());

UserService.GetUser = {
  methodName: "GetUser",
  service: UserService,
  requestStream: false,
  responseStream: false,
  requestType: model_user_pb.GetUserRequest,
  responseType: model_user_pb.User
};

UserService.QueryUsers = {
  methodName: "QueryUsers",
  service: UserService,
  requestStream: false,
  responseStream: true,
  requestType: model_user_pb.QueryUsersRequest,
  responseType: model_user_pb.User
};

exports.UserService = UserService;

function UserServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

UserServiceClient.prototype.getUser = function getUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(UserService.GetUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

UserServiceClient.prototype.queryUsers = function queryUsers(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(UserService.QueryUsers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.UserServiceClient = UserServiceClient;

