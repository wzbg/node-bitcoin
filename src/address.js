/*
* @Author: zyc
* @Date:   2016-09-13 23:40:05
* @Last Modified by:   zyc
* @Last Modified time: 2016-09-15 03:08:40
*/
'use strict'

const crypto = require('crypto')
const RIPEMD160 = require('ripemd160')
const base58check = require('base58check')

const Key = require('./key')

const getPubAddr = (pubKey, encoding) => { // 获取地址
  if (typeof pubKey === 'string') {
    pubKey = new Buffer(pubKey, encoding)
  }
  const hash = crypto.createHash('sha256').update(pubKey).digest()
  const data = new RIPEMD160().update(hash).digest()
  const addr = base58check.encode(data)
  return addr
}

const genPubAddr = (compressed = true, WIF, encoding) => { // 生成地址
  const privKey = Key.genPrivKey(compressed, WIF, encoding)
  const pubKey = Key.getPubKey(privKey, compressed, WIF, encoding)
  const addr = getPubAddr(pubKey, encoding)
  return { privKey, pubKey, addr }
}

module.exports = {
  getPubAddr,
  genPubAddr
}