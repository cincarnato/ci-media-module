"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fileUpload = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _FileModel = _interopRequireDefault(require("../models/FileModel"));

var _storeFile = _interopRequireDefault(require("./helpers/storeFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = function () {
  let url = process.env.APP_API_URL;

  if (!/^http:\/\//.test(url)) {
    url = "http://" + baseUrl;
  }

  if (!/\/$/.test(url)) {
    url += "/";
  }

  return url;
};

const fileUpload = function (user, inputFile) {
  return new Promise(async (resolve, rejects) => {
    const {
      filename,
      mimetype,
      encoding,
      createReadStream
    } = await inputFile;
    console.log('mimetype', mimetype);
    console.log('encoding', encoding);
    let type = mimetype.split("/")[0];

    const parseFileName = _path.default.parse(filename);

    const extension = parseFileName.ext;

    const relativePath = _path.default.join("media", "files", filename);

    const absolutePath = _path.default.resolve(relativePath); //Store


    let storeResult = await (0, _storeFile.default)(createReadStream(), relativePath);
    let url = baseUrl() + relativePath;

    if (storeResult && storeResult.finish) {
      _FileModel.default.create({
        filename: filename,
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
        if (err) return rejects(err); // saved!

        doc.populate('createdBy').execPopulate(() => resolve(doc));
      });
    } else {
      rejects(new Error("Upload Fail"));
    }
  });
};

exports.fileUpload = fileUpload;
var _default = fileUpload;
exports.default = _default;