import alfy from 'alfy';
import Core from '@alicloud/pop-core';
const sourceText = alfy.input

let client = new Core({
  accessKeyId: process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://mt.cn-hangzhou.aliyuncs.com',
  apiVersion: '2018-10-12'
});

let params = {
  "FormatType": "text",
  "TargetLanguage": process.env.TargetLanguage,
  "SourceLanguage": process.env.SourceLanguage,
  "SourceText": sourceText,
  "Scene": process.env.Scene
}

let requestOption = {
  method: 'POST',
  formatParams: false,

};

let targetStr = await client.request('Translate', params, requestOption).then((result) => {
  if (result.Code == 200) {
    return result.Data.Translated
  } else {
    return JSON.stringify(result);
  }
}, (ex) => {
  return ex.code;
})

console.log(targetStr)
