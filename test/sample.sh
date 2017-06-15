# list Class
list(){
  curl -X GET --header 'Accept: application/json' http://localhost:3000/api/$1 | python -m json.tool
}

# delete Class id
delete() {
  curl -X DELETE --header 'Accept: application/json' http://localhost:3000/api/$1/$2 | python -m json.tool
}

# createIssuer id
createIssuer() {
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d "{
    \"$class\": \"org.pccu.certnetwork.Issuer\",
    \"issuerId\": \"$1\",
    \"issuerName\": \"PCCU\"
 }" 'http://localhost:3000/api/Issuer' | python -m json.tool
}

# createReceiver id
createReceiver() {
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d "{
    \"$class\": \"org.pccu.certnetwork.Receiver\",
    \"receiverId\": \"$1\",
    \"firstName\": \"CT\",
    \"lastName\": \"Lin\"
  }" "http://localhost:3000/api/Receiver" | python -m json.tool
}

# createCertTemplate id issuerId
createCertTemplate() {
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d "{
    \"$class\": \"org.pccu.certnetwork.CertTemplate\",
    \"certTemplateId\": \"$1\",
    \"issuer\": \"$2\",
    \"title\": \"string\"
  }" "http://localhost:3000/api/CertTemplate" | python -m json.tool
}

# createCert certId certTemplateId receiverId
createCert() {
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d "{
    \"$class\": \"org.pccu.certnetwork.Cert\",
    \"certId\": \"$1\",
    \"certTemplate\": \"$2\",
    \"receiver\": \"$3\",
    \"CertStatus\": \"string\",
    \"createdAt\": \"string\"
  }" "http://localhost:3000/api/Cert" | python -m json.tool
}

# createCertTransaction transactionId certId receiverId
createCertTransaction() {
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d "{
    \"$class\": \"org.pccu.certnetwork.CertTransaction\",
    \"cert\": \"$2\",
    \"receiver\": \"$3\",
    \"timestamp\": \"2017-06-15T06:26:41.283Z\"
  }" "http://localhost:3000/api/CertTransaction" | python -m json.tool
}

delete Issuer 1
delete Issuer 2
list Issuer
createIssuer 1
createIssuer 2
list Issuer

delete Receiver 1
createReceiver 1

delete CertTemplate 1
createCertTemplate 1 1

list Receiver
list CertTemplate

delete Cert 1
createCert 1 1 1
list Cert

createCertTransaction 1 1 1
# delete CertTransaction fd885221-6364-40e8-99bc-3dd6f911d64e
# list CertTransaction
