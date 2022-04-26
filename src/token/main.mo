import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

  Debug.print("Hello");

  let owner: Principal = Principal.fromText("erm6d-jftzo-ae2bz-wgnrv-ar22r-rd3oy-a6c7j-edkmn-ffruj-tef7h-3ae");
  let totalSupply: Nat = 1000000000;
  let symbol: Text = "CTNO";


  // Temp Variable 
  private stable var balanceEntries: [(Principal, Nat)] = [];

  // Private variable so it can only be accessed within the Dapp canister
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  public query func balanceOf(who: Principal) : async Nat {

    let balance : Nat =  switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return balance;
  };

  public shared(msg) func getCaller() : async Text {
    let caller = Principal.toText(msg.caller);
    return caller;
  };

  public shared(msg) func payOut() : async Text {
    // Debug.print(debug_show(msg.caller));
    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };

  }; 

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient Funds";
    };

  };


  // PRE & POST upgrade function
  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    
    // Check if we have an empty balance, if true Assign owner total supply of tokens on first time we create our balances ledger 
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

};