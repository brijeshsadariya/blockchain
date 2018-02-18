const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
            return true;
    }
}

let bpCoin = new Blockchain();
bpCoin.addBlock(new Block(1, "02/01/2018", {amount: 4}));
bpCoin.addBlock(new Block(2, "12/01/2018", {amount: 14}));
bpCoin.addBlock(new Block(3, "22/01/2018", {amount: 10}));

console.log('Is the blockchain valid ? : ' + bpCoin.isChainValid());

bpCoin.chain[1].data = {amount : 100};
bpCoin.chain[1].hash = bpCoin.chain[1].calculateHash();

console.log('Is the blockchain valid ? : ' + bpCoin.isChainValid());

//console.log(JSON.stringify(bpCoin, null, 4));