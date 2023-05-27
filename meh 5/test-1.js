const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress,toAddress,amount)
    {
        this.fromAddress = fromAddress;
        this.toAddress= toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp,transactions,previousHash = '')
    {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }
    calcHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            this.hash=this.calcHash();
            this.nonce++;
        }
        console.log("Block mined" + this.hash)
    }
}
class Blockchain{
 constructor(){
    this.chain=[this.createGenesisBlock()];
    this.difficulty=3;
    this.pendingTransactions=[];
    this.miningReward=50;
 }   
 createGenesisBlock(){
    return new Block("03/01/2022","Genesis Block", "0");
 }
 getLatestBlock(){
    return this.chain[this.chain.length-1];
 }
 minePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(),this.pendingTransaction);
    
    block.mineBlock(this.difficulty);
    console.log("Block sucessfully mined");

    this.chain.push(block);
    
    this.pendingTransactions=[ new Transaction(null,miningRewardAddress,this.miningReward)];
 }
 createTransaction(transaction){
    this.pendingTransactions.push(transaction);
 }
 getBalanceOfAddress(address){
    let balance = 0;
    for (let i = 0;i < this.chain.length;i++)
    {
        for (let i = 0;i < this.pendingTransactions.length;i++)
        {
            if(this.pendingTransactions[i].fromAddress == address){
                balance = balance - 5;
            }
            if(this.pendingTransactions[i].fromAddress == address){
                balance = balance + 55;
            }
        }
    }
    return balance;
 }
 getExtraReward(max){
    return Math.floor(Math.random()*max);
 }
}
let btCoin = new Blockchain();
let trans1 = new Transaction('address1', 'address2', 90);
let trans2 = new Transaction('address2','address1', 60);
let trans3 = new Transaction('address2', 'address1', 100);
btCoin.createTransaction(trans1);
btCoin.createTransaction(trans2);
btCoin.createTransaction(trans3);
console.log('\nStarting miner 1..');
btCoin.minePendingTransactions('address1');
console.log("Reward balance of Alice is", btCoin.getBalanceOfAddress('address1'));
console.log('\nStarting miner 1..');
btCoin.minePendingTransactions('address1');
console.log("Reward balance of Alice is", btCoin.getBalanceOfAddress('address1'));
