/*
* @Author: zyc
* @Date:   2016-09-15 01:27:14
* @Last Modified by:   zyc
* @Last Modified time: 2016-09-15 03:19:27
*/
'use strict'

const { Key, Address } = require('../index')

const privKey = Key.genPrivKey(false)
// const privKey = new Buffer('3aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6', 'hex')
{
  const privKey = Key.genPrivKey()
  console.log(privKey, 'Private Key')
  const pubKey = Key.getPubKey(privKey)
  console.log(pubKey, 'Public Key')
  const addr = Address.getPubAddr(pubKey)
  console.log(pubKey, 'Address')
}
console.log()
const encoding = 'hex'
{
  const compressed = false, WIF = false
  const privKeyHex = Key.getPrivKey(privKey, compressed, WIF, encoding)
  console.log(privKeyHex, '\tPrivate Key (Hex)')
  const pubKey = Key.getPubKey(privKeyHex, compressed, WIF, encoding)
  console.log(pubKey, 'Public Key')
  const addr = Address.getPubAddr(pubKey, encoding)
  console.log(addr, '\tAddress')
}
console.log()
{
  const compressed = true, WIF = false
  const privKeyHexCompressed = Key.getPrivKey(privKey, compressed, WIF, encoding)
  console.log(privKeyHexCompressed, '\tPrivate Key (Hex-Compressed)')
  const pubKeyCompressed = Key.getPubKey(privKeyHexCompressed, compressed, WIF, encoding)
  console.log(pubKeyCompressed, '\tPublic Key (Compressed)')
  const addr = Address.getPubAddr(pubKeyCompressed, encoding)
  console.log(addr, '\tAddress (Compressed)')
}
console.log()
{
  const compressed = false, WIF = true
  const privKeyWIF = Key.getPrivKey(privKey, compressed, WIF)
  console.log(privKeyWIF, '\tPrivate Key (WIF)')
  const pubKey = Key.getPubKey(privKeyWIF, compressed, WIF, encoding)
  console.log(pubKey, 'Public Key')
  const addr = Address.getPubAddr(pubKey, encoding)
  console.log(addr, '\tAddress')
}
console.log()
{
  const compressed = true, WIF = true
  const privKeyWIFCompressed = Key.getPrivKey(privKey, compressed, WIF)
  console.log(privKeyWIFCompressed, '\tPrivate Key (WIF-Compressed)')
  const pubKeyCompressed = Key.getPubKey(privKeyWIFCompressed, compressed, WIF, encoding)
  console.log(pubKeyCompressed, '\tPublic Key (Compressed)')
  const addr = Address.getPubAddr(pubKeyCompressed, encoding)
  console.log(addr, '\tAddress (Compressed)')
}
console.log()
console.log(Address.genPubAddr())
console.log()
console.log(Address.genPubAddr(false, false, 'hex'))
console.log()
console.log(Address.genPubAddr(false, true, 'hex'))
console.log()
console.log(Address.genPubAddr(true, false, 'hex'))
console.log()
console.log(Address.genPubAddr(true, true, 'hex'))