
# Path to this plugin
PROTOC_GEN_TS_PATH="./web/node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_JS_DIR="./web/generated/"
OUT_GO_DIR="./generated/"

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_JS_DIR}" \
    --ts_out=service=grpc-web:"${OUT_JS_DIR}" \
	--go-grpc_out="${OUT_GO_DIR}" \
	--go_out="${OUT_GO_DIR}" \
	 model/book.proto model/user.proto