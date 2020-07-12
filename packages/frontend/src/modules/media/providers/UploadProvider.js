import graphqlClient from "../../../apollo";

class UploadProvider {

    uploadFile(file) {
        return graphqlClient.mutate({
            mutation: require('./gql/fileUpload.graphql'),
            variables: {file: file}
        })
    }


}

const uploadProvider =  new UploadProvider()

export default uploadProvider
