import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

var owner: Principal = Principal.fromText("jq6qp-o2riw-olddh-qafbu-duzw7-3kaa6-l6d4l-grkve-2zand-eftcv-eqe");
var totalSupply: Nat = 1000000000;
var symbol: Text = "DAK" ;

private stable var balancesEntries: [(Principal, Nat)] = [];

private var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal, Principal.hash);

if (balances.size() < 1) {
    balances.put(owner, totalSupply);
};


public query func getSymbol (): async Text {
return symbol
};

public query func balanceOf(who: Principal): async Nat {
let balance: Nat = switch(balances.get(who)){
    case null 0;
    case (?result) result
};
return balance;
};

public shared(msg) func payOut (): async Text {
    Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
    var amount = 10000;
   var newTransfer = await transfer(msg.caller, amount);
    return newTransfer
    } else {
        return "Already Claimed"
    }
};

public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
 let fromBalance = await balanceOf(msg.caller);

if (fromBalance > amount) {

    let newFromBalance: Nat = fromBalance - amount;
    balances.put(msg.caller, newFromBalance);
    let toBalance = await balanceOf(to);
    let newBalance = toBalance + amount;
    balances.put(to, newBalance);
    return "Success"
} else {
    return "Insufficient Funds"
}

};

system func preupgrade (){
    balancesEntries := Iter.toArray(balances.entries());
};

system func postupgrade (){
    balances := HashMap.fromIter<Principal, Nat>(balancesEntries.vals(), 1, Principal.equal, Principal.hash);
if (balances.size() < 1) {
    balances.put(owner, totalSupply);
}
};

}