import{c as v,_ as B}from"./index.2d15ca7f.js";import{_ as C}from"./UserLink.vue_vue_type_script_setup_true_lang.7500f36f.js";import{a as T,b as L,r as $,e as I,u as e,h as n,i as s,F as S,j as V,k as y,o,t as u,l as c,m as r}from"./entry.2cad2210.js";import{a as x,B as E}from"./cosmos.50c2661b.js";import{u as M}from"./metadata.61c8620d.js";const P={key:0},D=s("h2",null,"Recent NFT Purchases",-1),R=s("thead",null,[s("tr",null,[s("th",null,"#"),s("th",null,"NFT information"),s("th",null,"Purchase Price")])],-1),j=["src"],z=s("br",null,null,-1),K=s("br",null,null,-1),U=s("br",null,null,-1),q=s("br",null,null,-1),A=["onClick"],Z=T({__name:"purchase",setup(G){const N=L(),l=$([]),b=M(),{getClassMetadataById:i,lazyFetchClassMetadata:k}=b;I(async()=>{l.value=await x(),await Promise.all(l.value.map(a=>k(a.class_id)))});function w(a){N.push({path:`/listings/${a}`})}return(a,H)=>{const d=B,_=C;return e(l).length?(o(),n("section",P,[D,s("table",null,[R,s("tbody",null,[(o(!0),n(S,null,V(e(l),(t,F)=>{var h,m,f,p,g;return o(),n("tr",{key:`${t.class_id}_${t.nft_id}`},[s("td",null,"#"+u(F+1),1),s("td",null,[s("div",null,[s("h4",null,u((h=e(i)(t.class_id))==null?void 0:h.name),1),(p=(f=(m=e(i)(t.class_id))==null?void 0:m.data)==null?void 0:f.metadata)!=null&&p.image?(o(),n("img",{key:0,src:e(v)((g=e(i)(t.class_id).data)==null?void 0:g.metadata.image),height:"64",width:"64"},null,8,j)):y("",!0),z,c(" Class ID: "),r(d,{"class-id":t.class_id},null,8,["class-id"]),K,c(" NFT ID: "),r(d,{"class-id":t.class_id,"nft-id":t.nft_id},null,8,["class-id","nft-id"]),U,c(" Seller: "),r(_,{wallet:t.seller},null,8,["wallet"]),q,c(" Buyer: "),r(_,{wallet:t.creator},null,8,["wallet"])]),s("button",{onClick:J=>w(t.class_id)},"View NFT Class Listing",8,A)]),s("td",null,[s("section",null,[s("div",null,u(new e(E)(t.price).shiftedBy(-9).toFixed())+"LIKE",1)])])])}),128))])])])):y("",!0)}}});export{Z as default};