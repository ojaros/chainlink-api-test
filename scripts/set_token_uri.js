const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const TOKENID = 0
module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    console.log('Let\'s set the tokenURI of your characters')
    // const tx = await dnd.setTokenURI(0, "https://ipfs.io/ipfs/QmaSED9ZSbdGts5UZqueFJjrJ4oHH3GnmGJdSDrkzpYqRS?filename=the-chainlink-knight.json")
    const tx = await dnd.setTokenURI(1, "")    
    console.log(tx)
    callback(tx.tx)
}
