import{c as v,_ as C}from"./cosmos.6bf314d5.js";import{a as F,b as T,s as g,r as L,e as b,w as I,f as t,u as i,h as n,F as $,i as V,o as e,t as h,k as f,l as p}from"./entry.f2184657.js";import{u as x}from"./wallet.0dec2829.js";const B=n("h2",null,"View my NFTs",-1),D={key:0},S={key:1},O={key:0},R={key:1},Y=n("thead",null,[n("tr",null,[n("th",null,"#"),n("th",null,"NFT information"),n("th",null,"Your Listing")])],-1),q=n("br",null,null,-1),E=n("br",null,null,-1),M=["onClick"],P=["onClick"],G=F({__name:"index",setup(W){const c=T(),u=x(),{wallet:o}=g(u),a=L([]);b(async()=>{o.value||await w(),o.value&&d()}),I(o,l=>{l&&d()});const{connect:w}=u;async function d(){a.value=await v(o.value)}async function k(l){c.push({path:`/listings/${l}`})}async function y(l,r){c.push({path:`/sell/${l}/${r}`})}return(l,r)=>{const _=C;return e(),t("div",null,[B,i(o)?(e(),t("section",S,[i(a).length?(e(),t("table",R,[Y,n("tbody",null,[(e(!0),t($,null,V(i(a),(s,N)=>(e(),t("tr",null,[n("td",null,"#"+h(N+1),1),n("td",null,[n("h4",null,h(s.data.metadata.name),1),f(" Class ID: "),p(_,{"class-id":s.classId},null,8,["class-id"]),q,f(" NFT ID: "),p(_,{"class-id":s.classId,"nft-id":s.id},null,8,["class-id","nft-id"]),E,n("button",{onClick:m=>k(s.classId)},"View NFT Class Listing",8,M)]),n("td",null,[n("button",{onClick:m=>y(s.classId,s.id)},"Sell",8,P)])]))),256))])])):(e(),t("div",O,"You don't own any NFT on LikeCoin chain"))])):(e(),t("div",D,"Please connect wallet"))])}}});export{G as default};
