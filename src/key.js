/*
* @Author: zyc
* @Date:   2016-09-13 23:39:05
* @Last Modified by:   zyc
* @Last Modified time: 2016-09-15 02:44:35
*/
'use strict'

const crypto = require('crypto')
const secp256k1 = require('secp256k1')
const base58check = require('base58check')

const getPrivKey = (privKey, compressed = true, WIF, encoding) => { // 获取私钥
  if (!(privKey instanceof Buffer)) {
    throw new TypeError('"privKey" argument must be an Array of Buffers')
  }
  if (compressed) {
    privKey = Buffer.concat([privKey, new Buffer('01', 'hex')])
  }
  if (WIF) {
    privKey = base58check.encode(privKey, '80')
  }
  if (encoding) {
    privKey = privKey.toString(encoding)
  }
  return privKey
}

const genPrivKey = (compressed = true, WIF, encoding) => { // 生成私钥
  let privKey
  do {
    privKey = crypto.randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))
  return getPrivKey(privKey, compressed, WIF, encoding)
}

const getPubKey = (privKey, compressed = true, WIF, encoding) => { // 获取公钥
  if (WIF) {
    privKey = base58check.decode(privKey).data
  }
  if (!(privKey instanceof Buffer)) {
    privKey = new Buffer(privKey, encoding)
  }
  if (compressed) {
    privKey = privKey.slice(0, -1)
  }
  let pubKey = secp256k1.publicKeyCreate(privKey, compressed)
  if (encoding) {
    pubKey = pubKey.toString(encoding)
  }
  return pubKey
}

const genKeys = (compressed = true, WIF, encoding) => { // 生成密钥对
  const privKey = genPrivKey(compressed, WIF, encoding)
  const pubKey = getPubKey(privKey, compressed, WIF, encoding)
  return { privKey, pubKey }
}

module.exports = {
  genPrivKey,
  getPrivKey,
  getPubKey,
  genKeys
}