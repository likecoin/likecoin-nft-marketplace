import{c as C,_ as T}from"./index.6f1f47e5.js";import{_ as L}from"./UserLink.vue_vue_type_script_setup_true_lang.2a60c831.js";import{a as S,b as $,r as D,e as I,u as t,h as n,i as e,F as P,j as V,k as d,o,t as c,l as i,m as r}from"./entry.66d368a4.js";import{a as x,B as E}from"./cosmos.04f9d3c0.js";import{u as M}from"./metadata.d863c358.js";const R={key:0},z=e("h2",null,"Recent NFT Purchases",-1),j=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"NFT information"),e("th",null,"Purchase Time"),e("th",null,"Purchase Price")])],-1),K=["src"],U=e("br",null,null,-1),q=e("br",null,null,-1),A=e("br",null,null,-1),G=e("br",null,null,-1),H=["onClick"],J={key:0},te=S({__name:"purchase",setup(O){const N=$(),l=D([]),v=M(),{getClassMetadataById:u,getBlockTime:_,lazyFetchClassMetadata:w,lazyFetchBlockData:B}=v;I(async()=>{l.value=await x(),await Promise.all([...l.value.map(a=>w(a.message.class_id)),...l.value.map(a=>B(a.height))])});function F(a){N.push({path:`/listings/${a}`})}return(a,Q)=>{const h=T,m=L;return t(l).length?(o(),n("section",R,[z,e("table",null,[j,e("tbody",null,[(o(!0),n(P,null,V(t(l),(s,b)=>{var g,f,p,y,k;return o(),n("tr",{key:`${s.message.class_id}_${s.message.nft_id}`},[e("td",null,"#"+c(b+1),1),e("td",null,[e("div",null,[e("h4",null,c((g=t(u)(s.message.class_id))==null?void 0:g.name),1),(y=(p=(f=t(u)(s.message.class_id))==null?void 0:f.data)==null?void 0:p.metadata)!=null&&y.image?(o(),n("img",{key:0,src:t(C)((k=t(u)(s.message.class_id).data)==null?void 0:k.metadata.image),height:"64",width:"64"},null,8,K)):d("",!0),U,i(" Class ID: "),r(h,{"class-id":s.message.class_id},null,8,["class-id"]),q,i(" NFT ID: "),r(h,{"class-id":s.message.class_id,"nft-id":s.message.nft_id},null,8,["class-id","nft-id"]),A,i(" Seller: "),r(m,{wallet:s.message.seller},null,8,["wallet"]),G,i(" Buyer: "),r(m,{wallet:s.message.creator},null,8,["wallet"])]),e("button",{onClick:W=>F(s.message.class_id)},"View NFT Class Listing",8,H)]),e("td",null,[t(_)(s.height)?(o(),n("div",J,c(new Date(t(_)(s.height)).toString()),1)):d("",!0)]),e("td",null,[e("section",null,[e("div",null,c(new t(E)(s.message.price).shiftedBy(-9).toFixed())+"LIKE",1)])])])}),128))])])])):d("",!0)}}});export{te as default};