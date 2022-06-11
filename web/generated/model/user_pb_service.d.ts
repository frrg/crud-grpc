// package: model
// file: model/user.proto

import * as model_user_pb from "../model/user_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UserServiceGetUser = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_user_pb.GetUserRequest;
  readonly responseType: typeof model_user_pb.User;
};

type UserServiceQueryUsers = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof model_user_pb.QueryUsersRequest;
  readonly responseType: typeof model_user_pb.User;
};

export class UserService {
  static readonly serviceName: string;
  static readonly GetUser: UserServiceGetUser;
  static readonly QueryUsers: UserServiceQueryUsers;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class UserServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getUser(
    requestMessage: model_user_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_user_pb.User|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: model_user_pb.GetUserRequest,
    callback: (error: ServiceError|null, responseMessage: model_user_pb.User|null) => void
  ): UnaryResponse;
  queryUsers(requestMessage: model_user_pb.QueryUsersRequest, metadata?: grpc.Metadata): ResponseStream<model_user_pb.User>;
}

