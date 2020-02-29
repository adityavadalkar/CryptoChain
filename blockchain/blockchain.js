const Block = require('./block');

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
            return false;
        }
        for(let i=1; i<chain.length; i++)
        {
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)){
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        if(newChain.length <= this.chain.length){
            console.log('The length of new chain should be greater than the existing chain.');
            return;
        }else if(!this.isValidChain(newChain)){
            console.log('The new chain is not valid.');
            return;
        }
        this.chain = newChain;
        console.log("The existing chain has been replaced by the new chain.");
    }
}
module.exports = Blockchain;