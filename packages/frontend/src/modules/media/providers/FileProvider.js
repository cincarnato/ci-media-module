import graphqlClient from "../../../apollo";

class FileProvider {

    findFile(id) {
        return graphqlClient.query({
            query: require('./gql/fileFind.graphql'),
            variables: {id:id}
        })
    }

    fetchFiles() {
        return graphqlClient.query({query: require('./gql/fileFetch.graphql')})
    }
    
    paginateFiles(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/filePaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    

    updateFile(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/fileUpdate.graphql'),
            variables: form
        })
    }
    
     deleteFile(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/fileDelete.graphql'),
            variables: {id}
        })
    }

}

export default new FileProvider()


