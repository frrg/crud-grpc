
// Import code-generated data structures.
import { BookService } from "../generated/model/book_pb_service";
import { GetBookRequest } from "../generated/model/book_pb";
import { grpc } from "@improbable-eng/grpc-web"
import {useState} from "react"
const Book = () => {
	
const myTransport = grpc.CrossBrowserHttpTransport({ withCredentials: true });
grpc.setDefaultTransport(myTransport);

const [listBook,setListBook] = useState() 
	grpc.unary(BookService.GetBook, {
		request: GetBookRequest,
		host: "https://localhost:8080",
		onEnd: res => {
			const { status, statusMessage, headers, message, trailers } = res;
			if (status === grpc.Code.OK && message) {
				setListBook(message.toObject);
				console.log("all ok. got book: ", message.toObject());
			}
		}
	});
	return (
		<div>{listBook}</div>
	)
}

export default Book 