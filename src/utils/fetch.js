import './option.js'
//*uuid
const uuid = "3723971d-43b5-dc9e-28f6-50ba312f0a39"
//* token
const Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIzNjAzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIxNTU4MzMwMDc3NiIsIm5iZiI6MTU4NjIyOTMwMywiZXhwIjoxNTg2NjYxMzAzLCJpc3MiOiJKYi53ZWJBcGkiLCJhdWQiOiJKYi5DbGllbnQifQ.TcvVWj4nIsuhjGQa9dGkN0fuD4qeETLiW8_MQrC7Fo0"
//header
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-version':'2.2',
    'x-device':JSON.stringify({
      "DeviceCode":uuid,
      "DeviceName":'',
      "Terminal":'H5'}),
    'x-ts':global._gb_ts,
    'x-id':'web5a555c549f69d6701c0947640e0',
    'x-ns':global._gb_ns,
    'x-sign':global._gb_k,
    'Authorization':Authorization
}



export default headers;