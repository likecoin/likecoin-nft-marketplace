import{d as S,_ as V,c as $,e as D,B as E,s as M}from"./index.e16ccaca.js";import{_ as R}from"./UserLink.vue_vue_type_script_setup_true_lang.acc46464.js";import{a as q,b as j,q as z,s as K,r as k,m as P,e as U,f as n,h as t,t as o,u as e,j as I,k as f,l as p,F as W,i as A,o as l}from"./entry.2c743e4f.js";import{u as G}from"./wallet.ad5f6102.js";import{u as H}from"./metadata.54c194e5.js";const J=t("br",null,null,-1),O=["src"],Q=t("br",null,null,-1),X=["href"],Y=t("br",null,null,-1),Z=t("h2",null,"Listings",-1),tt={key:0},et={key:1},at=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"NFT information"),t("th",null,"Listing Price")])],-1),st=t("br",null,null,-1),nt=["onClick"],_t=q({__name:"[classId]",setup(lt){const w=j(),B=z(),g=G(),F=H(),{wallet:c,signer:d}=K(g),_=k([]),s=k({}),m=P(()=>B.params.classId),{connect:L}=g,{lazyFetchClassMetadata:T}=F;U(async()=>{s.value=await T(m.value),_.value=await S(m.value)});async function x({classId:v,nftId:y,seller:r,price:h}){if((!c.value||!d.value)&&await L(),!c.value||!d.value)return;const u=new E(h).shiftedBy(-9).toNumber(),i=await M(v,y,r,u,d.value,c.value);console.log(i),w.push({path:"/owned"})}return(v,y)=>{var u,i,N,b;const r=V,h=R;return l(),n("div",null,[t("h1",null,o(e(s).name),1),J,(i=(u=e(s).data)==null?void 0:u.metadata)!=null&&i.image?(l(),n("img",{key:0,src:e($)(e(s).data.metadata.image),width:"256",height:"256"},null,8,O)):I("",!0),Q,t("p",null,o(e(s).description),1),t("div",null,[f("Class ID: "),p(r,{"class-id":e(m)},null,8,["class-id"])]),(b=(N=e(s).data)==null?void 0:N.metadata)!=null&&b.external_url?(l(),n("a",{key:1,href:e(s).data.metadata.external_url,target:"_blank",rel:"noopener"},"View External Link",8,X)):I("",!0),Y,Z,t("section",null,[e(_).length?(l(),n("table",et,[at,t("tbody",null,[(l(!0),n(W,null,A(e(_),(a,C)=>(l(),n("tr",{key:`${a.classId}_${a.nftId}`},[t("td",null,"#"+o(C+1),1),t("td",null,[t("div",null,[f(" NFT ID: "),p(r,{"class-id":a.classId,"nft-id":a.nftId},null,8,["class-id","nft-id"]),st,f(" Sold by: "),p(h,{wallet:a.seller},null,8,["wallet"])])]),t("td",null,[t("section",null,[t("div",null,o(e(D)(a.price))+" LIKE",1),t("div",null,"till "+o(a.expiration),1)]),t("button",{onClick:ot=>x(a)},"Buy",8,nt)])]))),128))])])):(l(),n("div",tt,"No one is selling this NFT yet"))])])}}});export{_t as default};
