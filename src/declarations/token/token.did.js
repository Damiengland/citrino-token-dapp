export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getCaller' : IDL.Func([], [IDL.Text], []),
    'payOut' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
