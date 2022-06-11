// package: model
// file: model/book.proto

import * as model_book_pb from "../model/book_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BookServiceGetBook = {
  readonly methodName: string;
  readonly service: typeof BookService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof model_book_pb.GetBookRequest;
  readonly responseType: typeof model_book_pb.Book;
};

type BookServiceQueryBooks = {
  readonly methodName: string;
  readonly service: typeof BookService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof model_book_pb.QueryBooksRequest;
  readonly responseType: typeof model_book_pb.Book;
};

export class BookService {
  static readonly serviceName: string;
  static readonly GetBook: BookServiceGetBook;
  static readonly QueryBooks: BookServiceQueryBooks;
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

export class BookServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getBook(
    requestMessage: model_book_pb.GetBookRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: model_book_pb.Book|null) => void
  ): UnaryResponse;
  getBook(
    requestMessage: model_book_pb.GetBookRequest,
    callback: (error: ServiceError|null, responseMessage: model_book_pb.Book|null) => void
  ): UnaryResponse;
  queryBooks(requestMessage: model_book_pb.QueryBooksRequest, metadata?: grpc.Metadata): ResponseStream<model_book_pb.Book>;
}

