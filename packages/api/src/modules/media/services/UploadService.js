import path from "path";
import fs from "fs";
import file from '../models/FileModel'
import storeFile from './helpers/storeFile'
import randomString from './helpers/randomString'

const baseUrl = function () {
    let url = process.env.APP_API_URL

    if (!/^http:\/\//.test(url)) {
        url = "http://" + baseUrl
    }

    if (!/\/$/.test(url)) {
        url += "/"
    }

    return url
}

const fileUpload = function (user, inputFile) {

    return new Promise(async (resolve, rejects) => {

        const {filename, mimetype, encoding, createReadStream} = await inputFile;

        console.log('mimetype', mimetype)
        console.log('encoding', encoding)

        let type = mimetype.split("/")[0]

        const parseFileName = path.parse(filename);
        const extension = parseFileName.ext
        const name = parseFileName.name
        const hash = '-' + randomString(6)
        const finalFileName = name + hash + extension
        const year = new Date().getFullYear().toString()
        const relativePath = path.join("media", "files", user.username, year, finalFileName)
        const absolutePath = path.resolve(relativePath);

        //Store
        let storeResult = await storeFile(createReadStream(), relativePath)

        let url = baseUrl() + relativePath

        if (storeResult && storeResult.finish) {

            file.create({
                filename: finalFileName,
                mimetype: mimetype,
                encoding: encoding,
                type: type,
                extension: extension,
                relativePath: relativePath,
                absolutePath: absolutePath,
                size: storeResult.bytesWritten,
                url: url,
                createdBy: user.id
            }, function (err, doc) {
                if (err) return rejects(err);
                // saved!
                doc.populate('createdBy').execPopulate(() => (resolve(doc)))
            });

        } else {
            rejects(new Error("Upload Fail"))
        }

    })

}

export {fileUpload}
export default fileUpload